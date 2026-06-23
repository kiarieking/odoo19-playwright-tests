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
    readonly ok_post_btn: Locator
    readonly post_error: Locator
    readonly delivery_date: Locator
    readonly todaysdate: Locator
    readonly new_dispatch: Locator
    readonly customer: Locator
    readonly product_type: Locator
    readonly delivery_no: Locator
    readonly vehicle: Locator
    readonly dispatch_date: Locator
    readonly select_customer: Locator
    readonly select_product: Locator
    readonly select_vehicle: Locator
    readonly add_line: Locator
    readonly product_name: Locator
    readonly select_product_line: Locator
    readonly input_quantity_line: Locator
    readonly save_dispatch: Locator
    readonly vehicle_input: Locator
    readonly quotation_link: Locator
    readonly searchbox: Locator

    readonly delivered_status_bar: Locator
    readonly quotation_status_bar: Locator
    readonly to_approve_status_bar: Locator
    readonly admin_ops_status_bar: Locator
    readonly inTransit_status_bar: Locator
    readonly sales_order_status_bar: Locator
    readonly posted_status_bar: Locator
    


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
        this.delivery_date = page.locator('#delivery_date_0')
        this.todaysdate = page.locator('.o_date_item_cell.o_today')
        this.new_dispatch = page.getByRole('button', {name: 'New'})
        this.customer = page.locator('#partner_id_0')
        this.product_type = page.locator('#po_type_0')
        this.delivery_no = page.locator('#order_no_0')
        this.vehicle = page.locator('[name="vehicle_id"] .o_field_many2one_selection .o_input_dropdown')
        this.vehicle_input = page.locator('#vehicle_id_0')
        this.dispatch_date = page.locator('#dispatch_date_0')
        this.select_customer = page.locator('#partner_id_0_0_0')
        this.select_product = page.getByText("BEER TRANSFER")
        this.select_vehicle = page.locator('#vehicle_id_0_0_3')
        this.add_line = page.getByRole('button', {name: 'Add a line'})
        this.product_name = page.locator('div[name="product_id"] input')
        this.select_product_line = page.locator('#autocomplete_0_0')
        this.input_quantity_line = page.locator('div[name="quantity"] input')
        this.save_dispatch = page.getByRole('button', { name: 'Save manually' })
        this.quotation_link = page.getByRole('link', {name: 'KBL Quotations'})
        this.searchbox = page.getByRole('searchbox')

        this.delivered_status_bar = page.getByRole('radio', {name: 'Delivered'})
        this.quotation_status_bar = page.getByRole('radio', {name: 'Quotation'})
        this.to_approve_status_bar = page.getByRole('radio', {name: 'To Approve'})
        this.admin_ops_status_bar = page.getByRole('radio', {name: 'Admin Operations'})
        this.inTransit_status_bar = page.getByRole('radio', {name: 'In Transit'})
        this.sales_order_status_bar = page.getByRole('radio', {name: 'Sales Order'})
        this.posted_status_bar = page.getByRole('radio', {name: 'Posted'})
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

    async clickDeliveryDate(){
        const value = await this.delivery_date.getAttribute('value')

        if (!value || !value.trim()){
            await this.delivery_date.click()

            await this.todaysdate.click()
        }

        
    }

    async create_dispatch(){
        await this.new_dispatch.click()

        await this.customer.click()
        await this.select_customer.click()
        await this.product_type.click()
        await this.select_product.click()
        await this.delivery_no.fill("1238")
        await this.page.waitForTimeout(2000)
        await this.page.mouse.wheel(0, 350)
        await expect(this.vehicle_input).toBeVisible()
        // await this.vehicle.click()
        await this.vehicle_input.click()
        await this.select_vehicle.click()
        await this.dispatch_date.click()
        await this.todaysdate.click()
        await this.add_line.click()
        await this.product_name.click()
        await this.select_product_line.click()
        await this.input_quantity_line.fill("2")
        await this.save_dispatch.click()
        await this.page.waitForTimeout(2000)

        const order_number = this.page.locator("//div[@name='name']/span")
        const text = await order_number.textContent()

        if (!text){
            throw new Error("Dispatch number was not generated")
        }

        return text.trim()

    }

}