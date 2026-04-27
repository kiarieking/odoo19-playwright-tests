import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class DispatchPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async openDispatch(){
        // const page1 = await this.page.waitForEvent('popup');
        console.log(this.page.url())
        await this.page.getByRole('option', { name: 'Dispatch' }).click();
        console.log(this.page.url())
        // await this.page.goto('https://ponty-erp-staging-31243847.dev.odoo.com/odoo/action-624');
        const januaryGroup = this.page.locator('tr:has-text("January 2023")');
        await expect(januaryGroup).toBeVisible();
        await januaryGroup.click();
    }

}