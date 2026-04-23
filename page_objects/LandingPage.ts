import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class LandinPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async open_landing_page(){
        // Open staging application
    await this.page.locator('span.o_paas_branch a[href="/project/ponty-erp/branches/staging"]').click();
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('link', { name: 'CONNECT' }).click();
    
    const page1 = await this.page.waitForEvent('popup');
    await page1.getByRole('option', { name: 'Dispatch' }).click();
    await page1.goto('https://ponty-erp-staging-31243847.dev.odoo.com/odoo/action-624');
    }
}