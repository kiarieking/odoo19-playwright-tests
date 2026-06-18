import { test, expect } from "@playwright/test"
import { LandinPage } from "../page_objects/LandingPage"
import { DispatchPage } from "../page_objects/DispatchPage"


test.describe('Dispatch workflow', () => {

    let dispatchpage: DispatchPage
    test.beforeEach(async({page}) => {
        try {
            const landingpage = new LandinPage(page)
            const stagingpage = await landingpage.open_landing_page();

            dispatchpage = new DispatchPage(stagingpage)

            await dispatchpage.openDispatch()
            
        } catch (error) {
            console.log('Failed to open odoo application.')
            throw error
        }

        
    })

    test.describe.configure({timeout: 300000, mode: "parallel"})

    // test ('Reset cancelled dispatch to draft', async({page}) => {

    //     await dispatchpage.openDispatchStatus('Cancelled (')
        
    //     await dispatchpage.reset_btn.click()

    //     await expect(dispatchpage.quotation_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})

    // })

    test ('Approve dispatch (with dispatch date set)', async({page}) => {

        await dispatchpage.openDispatchStatus('Delivered (')

        await dispatchpage.clickDeliveryDate()
        
        await dispatchpage.approve_dispatch.click()

        await expect(dispatchpage.to_approve_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})
    })


    // test ('Confirm dispatch', async({page}) => {

    //     await dispatchpage.openDispatchStatus('Quotation (')

    //     await dispatchpage.confirm_dispatch.click()

    //     await expect(dispatchpage.admin_ops_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})
    // })

    // test ('Confirm delivered', async({page}) => {

    //     await dispatchpage.openDispatchStatus('In Transit (')

    //     await dispatchpage.confirm_delivered.click()

    //     await expect(dispatchpage.delivered_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})

    // })

    // test ('Approve dispatch', async({page}) => {

    //     await dispatchpage.openDispatchStatus('To Approve (')

    //     await dispatchpage.post_dispatch.click()

    //     await dispatchpage.ok_post_btn.click()

    //     await expect(dispatchpage.post_error).toBeVisible()
    // })

    // test ('Admin Operations tests', async({page}) => {

    //     await dispatchpage.openDispatchStatus('Admin Operations (')

    //     await dispatchpage.dispatch_action.click()

    //     await expect(dispatchpage.inTransit_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})

    // })

    // test ('Open sales Order', async({page}) => {

    //     await dispatchpage.openDispatchStatus('Sales Order (')

    //     await expect(dispatchpage.sales_order_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})
    // })

    // test ('Open posted dispatch test', async({page}) => {

    //     await dispatchpage.openDispatchStatus('Posted (')

    //     await expect(dispatchpage.posted_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})


    // })


})


