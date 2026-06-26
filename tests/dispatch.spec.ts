import { test, expect } from "@playwright/test"
import { LandinPage } from "../page_objects/LandingPage"
import { DispatchPage } from "../page_objects/DispatchPage"


test.describe('Dispatch workflow', () => {

    let dispatchpage: DispatchPage
    let order_no: string 
    test.beforeEach(async({page}) => {
        try {
            const landingpage = new LandinPage(page)
            const stagingpage = await landingpage.open_landing_page();

            dispatchpage = new DispatchPage(stagingpage)

            await dispatchpage.openDispatch()

            order_no = await dispatchpage.create_dispatch()

            await dispatchpage.quotation_link.click()

            await dispatchpage.searchbox.click()

            await dispatchpage.searchbox.fill(order_no)

            await dispatchpage.searchby.click()

            await dispatchpage.result_claret.click()

            await dispatchpage.openDispatchStatus('Quotation (1)')
            
        } catch (error) {
            console.log('Failed to open odoo application.')
            throw error
        }

        
    })

    test.describe.configure({timeout: 300000, mode: "parallel"})

    // test ('Test create dispatch', async({page}) => {
    //     console.log(order_no)
    //     await expect(order_no).toBeTruthy()
        
        

    // })

    // test ('Reset cancelled dispatch to draft', async({page}) => {

    //     try {
    //         await dispatchpage.cancel_btn.click()

    //         await expect(dispatchpage.cancelled_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 30000})
        
    //         await dispatchpage.reset_btn.click()

    //         await expect(dispatchpage.quotation_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 30000})

            
    //     } catch (error) {
           
    //         console.log("Reset cancelled dispatch to draft failed")
    //         throw(error)

    //     }

        
    // })

    // test ('Approve dispatch (with dynamic dispatch date )', async({page}) => {

    //     try {
    //         await dispatchpage.confirm_dispatch.click()

    //         await dispatchpage.dispatch_action.click()

    //         await dispatchpage.confirm_delivered.click()

    //         // await dispatchpage.openDispatchStatus('Delivered (')

    //         await dispatchpage.clickDeliveryDate()
            
    //         await dispatchpage.approve_dispatch.click()

    //         await page.waitForTimeout(2000)

    //         await expect(dispatchpage.to_approve_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 30000})
            
    //     } catch (error) {

    //         console.log("Approve dispatch failed")
    //         throw(error)
    //     }

        
    // })


    test ('Confirm dispatch', async({page}) => {
        try {

            await dispatchpage.confirm_dispatch.click()

            await expect(dispatchpage.admin_ops_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 30000})

        } catch (error) {
            console.log('Confirm dispatch failed')
            throw(error)
        }

        
    })

    // test ('Confirm delivered', async({page}) => {
    //     try {
    //         await dispatchpage.confirm_dispatch.click()

    //         await dispatchpage.dispatch_action.click()

    //         await dispatchpage.confirm_delivered.click()

    //         await expect(dispatchpage.delivered_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 30000})

    //     } catch (error) {
            
    //         console.log("Confirm delivered failed.")
    //         throw(error)

    //     }

    // })

    // test ('Approve dispatch', async({page}) => {

    //     try {
    //         await dispatchpage.confirm_dispatch.click()

    //         await dispatchpage.dispatch_action.click()

    //         await dispatchpage.confirm_delivered.click()

    //         // await dispatchpage.openDispatchStatus('Delivered (')

    //         await dispatchpage.clickDeliveryDate()
            
    //         await dispatchpage.approve_dispatch.click()

    //         await page.waitForTimeout(2000)
            
    //         // await dispatchpage.openDispatchStatus('To Approve (')

    //         await dispatchpage.post_dispatch.click()

    //         await dispatchpage.ok_post_btn.click()

    //         await expect(dispatchpage.post_error).toBeVisible()

    //     } catch (error) {
            
    //         console.log("Approve dispatch failed.")
    //         throw(error)

    //     }

        
    // })

    // test ('Admin Operations tests', async({page}) => {
    //     try {

    //         //  await dispatchpage.openDispatchStatus('Admin Operations (')
    //         await dispatchpage.confirm_dispatch.click()

    //         await dispatchpage.dispatch_action.click()

    //         await expect(dispatchpage.inTransit_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 30000})

    //     } catch (error) {
            
    //         console.log("Admin Operations tests failed.")
    //         throw(error)

    //     }

       
    // })

    // test ('Open sales Order', async({page}) => {
    //     try {

    //         await dispatchpage.openDispatchStatus('Sales Order (')

    //         await expect(dispatchpage.sales_order_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})

    //     } catch (error) {

    //         console.log("Open sales Order failed.")
    //         throw(error)

    //     }


    // })

    // test ('Open posted dispatch test', async({page}) => {
    //     await dispatchpage.create_dispatch()
    //     try {
            
    //         await dispatchpage.openDispatchStatus('Posted (')

    //         await expect(dispatchpage.posted_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})
    //         await expect(dispatchpage.posted_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})


    //     } catch (error) {

    //         console.log("Open posted dispatch test failed.")
    //         throw(error)
            
    //     }    

    // })


})


