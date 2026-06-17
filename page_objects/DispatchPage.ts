import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'

export class DispatchPage extends Basepage{
    readonly reset_btn: Locator
    readonly dispatch_status: Locator
    readonly confirm_disaptch: Locator
    readonly approve_dispatch: Locator
    readonly post_dispatch: Locator
    readonly confirm_dispatch: Locator
    readonly dispatch_action: Locator
    readonly confirm_delivered: Locator
    readonly delivered_status_bar: Locator
    readonly quotation_status_bar: Locator
    readonly to_approve_status_bar: Locator
    readonly admin_ops_status_bar: Locator
    readonly ok_post_btn: Locator
    readonly post_error: Locator


    constructor(page:Page){
        super(page)
        this.reset_btn = page.locator("[name='action_reset']")
        this.dispatch_status = page.getByRole('radio', { name: 'Quotation' })
        this.confirm_disaptch = page.locator("[name='action_reset']")
        this.approve_dispatch = page.locator("[name='action_approve']")
        this.post_dispatch = page.locator("[name='action_post']")
        this.confirm_dispatch = page.locator("[name='action_allocate']")
        this.dispatch_action = page.locator("[name='action_dispatch']")
        this.confirm_delivered = page.locator("[name='action_delivered']")
        this.ok_post_btn = page.locator('//button[normalize-space()="Ok"]')
        this.post_error = page.locator('//p[normalize-space()="PODs not yet uploaded!"]')


        this.delivered_status_bar = page.getByRole('radio', {name: 'Delivered'})
        this.quotation_status_bar = page.getByRole('radio', {name: 'Quotation'})
        this.to_approve_status_bar = page.getByRole('radio', {name: 'To Approve'})
        this.admin_ops_status_bar = page.getByRole('radio', {name: 'Admin Operations'})
    }

    async openDispatch(){
       
        await this.page.getByRole('option', { name: 'Dispatch' }).click();
        
        const groupRows = this.page.locator('tr.o_group_header');

        await expect(groupRows.first()).toBeVisible({ timeout: 20000 });
     
      
        const januaryGroup = this.page.locator('tr:has-text("January 2023")');
        await expect(januaryGroup).toBeVisible({timeout: 15000});
        await januaryGroup.click();

    }

    async openDispatchStatus(status: string){
        await this.page.locator(`text=${status}`).click()
        await this.page.locator('tr.o_data_row').first().click()
        // await this.page.waitForTimeout(15000);
    }

}