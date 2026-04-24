import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class DispatchPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async openDispatch(){
        const page1 = await this.page.waitForEvent('popup');
        await page1.getByRole('option', { name: 'Dispatch' }).click();
        await page1.goto('https://ponty-erp-staging-31243847.dev.odoo.com/odoo/action-624');
        console.log(await page1.url());
        await page1.locator('tr:has-text("January 2023")').click();
    }

}