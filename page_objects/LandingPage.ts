import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class LandinPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async open_landing_page(): Promise<Page>{
        await this.page.goto('https://www.odoo.sh/')
        await this.page.getByRole('link', {name: 'Sign in'}).click()

        // Enter odoo.sh dashboard through github
        await this.page.locator('#login_field').fill('kiarieking')
        await this.page.locator('#password').fill(process.env.GITHUB_PASSWORD!)
        await this.page.click('input[type="submit"][value="Sign in"]');
        await this.page.screenshot({ path: 'after-login.png', fullPage: true });
        console.log(await this.page.url());
        await expect(this.page.getByRole('link', {name: 'ponty-erp'})).toBeVisible({timeout: 10000})

        //Open odoo sh
        await this.page.getByRole('link',{name: 'Open'}).click()
        await expect(this.page).toHaveURL('https://www.odoo.sh/project/ponty-erp')

        // Open staging application
        await this.page.locator('span.o_paas_branch a[href="/project/ponty-erp/branches/staging"]').click();
        const [stagingPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.getByRole('link', { name: 'CONNECT' }).click()
        ]);

        await stagingPage.waitForLoadState();

        // const banner = this.page.locator('#oe_neutralize_banner');

        // await expect(banner).toBeVisible();

        return stagingPage;   
    
    }
}