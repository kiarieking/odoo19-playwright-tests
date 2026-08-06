import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'
import dotenv from 'dotenv'
import * as OTPAuth from 'otpauth'

dotenv.config()

export class LandinPage extends Basepage {
    constructor(page: Page) {
        super(page)
    }

    async github_authorize_odoo() {
        const authorize_button = this.page.getByRole('button', { name: 'Authorize odoo' })

        if (await authorize_button.isVisible({ timeout: 3000 }).catch(() => false)) {
            await authorize_button.click()
        }
    }

    async handle_github_2fa() {
        const totpInput = this.page.locator('#app_totp, input[name="app_totp"]')

        // Check if GitHub presented a 2FA prompt (5s timeout)
        const needs2FA = await totpInput.isVisible({ timeout: 5000 }).catch(() => false)

        if (needs2FA) {
            const secret = process.env.GITHUB_TOTP_SECRET

            if (!secret) {
                throw new Error('GitHub 2FA prompt detected, but GITHUB_TOTP_SECRET is not defined in .env')
            }

            // Generate TOTP code on the fly
            const totp = new OTPAuth.TOTP({
                algorithm: 'SHA1',
                digits: 6,
                period: 30,
                secret: secret.replace(/\s+/g, '') // strip any accidental whitespace
            })

            const token = totp.generate()
            await totpInput.fill(token)

            // Wait for redirect or submission completion
            await this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {})
        }
    }

    async open_landing_page(): Promise<Page> {
        await this.page.goto('/')
        await this.page.getByRole('link', { name: 'Sign in' }).click()

        // Enter odoo.sh dashboard through GitHub
        await this.page.locator('#login_field').fill(process.env.GITHUB_USERNAME!)
        await this.page.locator('#password').fill(process.env.GITHUB_PASSWORD!)

        await this.page.click('input[type="submit"][value="Sign in"]')

        // Handle 2FA if the account requires it; skip automatically if it doesn't
        await this.handle_github_2fa()

        if (this.page.url() !== "https://www.odoo.sh/project") {
            await this.github_authorize_odoo()
        }

        await expect(this.page.getByRole('link', { name: 'ponty-erp' })).toBeVisible({ timeout: 10000 })

        // Open odoo.sh
        await this.page.getByRole('link', { name: 'Open' }).click()
        await expect(this.page).toHaveURL('https://www.odoo.sh/project/ponty-erp')

        // Open staging application
        await this.page.locator('span.o_paas_branch a[href="/project/ponty-erp/branches/staging"]').click()
        const [stagingPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.getByRole('link', { name: 'CONNECT' }).click()
        ])

        await stagingPage.waitForLoadState()

        return stagingPage
    }
}