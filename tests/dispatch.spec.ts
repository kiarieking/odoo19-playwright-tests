import { test, expect } from "@playwright/test"
import { LandinPage } from "../page_objects/LandingPage"
import { DispatchPage } from "../page_objects/DispatchPage"


test.describe('Dispatch workflow', () => {

    // test.beforeEach(async({page}) => {
        
    // })

    test.describe.configure({timeout: 300000, mode: "serial"})

    // test ('Reset cancelled dispatch to draft', async({page}) => {
    //     // test.setTimeout(60000)
    //     const landingpage = new LandinPage(page)
    //     const stagingpage = await landingpage.open_landing_page();

    //     const dispatchpage = new DispatchPage(stagingpage)

    //     await dispatchpage.openDispatch()

    //     await dispatchpage.openDispatchStatus('Cancelled (')
        
    //     await dispatchpage.reset_btn.click()

    //     await expect(dispatchpage.quotation_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})

    // })

    test ('Approve dispatch (with dispatch date new test)', async({page}) => {
        // test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('Delivered (')
        
        await dispatchpage.approve_dispatch.click()

        await expect(dispatchpage.to_approve_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})
    })


    test ('Confirm dispatch', async({page}) => {
        // test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('Quotation (')

        await dispatchpage.confirm_dispatch.click()

        await expect(dispatchpage.admin_ops_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})
    })

    test ('Confirm delivered', async({page}) => {
        // test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('In Transit (')

        await dispatchpage.confirm_delivered.click()

        await expect(dispatchpage.delivered_status_bar).toHaveAttribute('aria-checked', 'true', {timeout: 15000})

    })


})


