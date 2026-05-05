import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class DispatchPage extends Basepage{
    readonly reset_btn: Locator
    readonly dispatch_status: Locator
    readonly confirm_disaptch: Locator

    constructor(page:Page){
        super(page)
        this.reset_btn = page.locator("[name='action_reset']")
        this.dispatch_status = page.getByRole('radio', { name: 'Quotation' })
        this.confirm_disaptch = page.locator("[name='action_reset']")
    }

    async openDispatch(){
       
        await this.page.getByRole('option', { name: 'Dispatch' }).click();
        
        const groupRows = this.page.locator('tr.o_group_header');

        await expect(groupRows.first()).toBeVisible({ timeout: 20000 });
     
      
        const januaryGroup = this.page.locator('tr:has-text("January 2023")');
        await expect(januaryGroup).toBeVisible({timeout: 15000});
        await januaryGroup.click();
        await this.page.locator('text=Cancelled').click()
        await this.page.locator('tr.o_data_row').first().click()
        await this.page.waitForTimeout(15000);

    }

}