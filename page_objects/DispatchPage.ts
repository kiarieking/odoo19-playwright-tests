import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class DispatchPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async openDispatch(){
        this.page.goto('https://ponty-erp-staging-31243847.dev.odoo.com/odoo/action-624')
        console.log(await this.page.url());
        await this.page.locator('tr:has-text("January 2023")').click();
    }

}