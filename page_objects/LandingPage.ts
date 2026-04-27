import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class LandinPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async open_landing_page(): Promise<Page>{
        await this.page.goto('https://www.odoo.sh/')
        await this.page.getByRole('link', {name: 'Sign in'}).click()

        // Enter odoo.sh dashboard
        await this.page.locator('#login_field').fill('kiariekevin22@gmail.com')
        await this.page.locator('#password').fill('$kingara120')
        await this.page.click('input[type="submit"][value="Sign in"]');
        await expect(this.page.getByRole('link', {name: 'ponty-erp'})).toBeVisible()

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

        return stagingPage;   
    
    }
}