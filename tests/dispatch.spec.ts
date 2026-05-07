import { test, expect } from "@playwright/test"
import { LandinPage } from "../page_objects/LandingPage"
import { DispatchPage } from "../page_objects/DispatchPage"


test.describe.serial('Dispatch workflow', () => {

    test.beforeEach(async({page}) => {
        
    })

    test ('Reset cancelled dispatch to draft', async({page}) => {
        test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('Cancelled (')
        
        await dispatchpage.reset_btn.click()

        await expect(dispatchpage.confirm_dispatch).toBeVisible()

    })

    test ('Approve dispatch', async({page}) => {
        test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('Delivered (')
        
        await dispatchpage.approve_dispatch.click()

        await expect(dispatchpage.post_dispatch).toBeVisible()
    })


    test ('Confirm dispatch', async({page}) => {
        test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('Quotation (')

        await dispatchpage.confirm_dispatch.click()

        await expect(dispatchpage.dispatch_action).toBeVisible()
    })

    test ('Confirm delivered', async({page}) => {
        test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()

        await dispatchpage.openDispatchStatus('In Transit (')

        await dispatchpage.confirm_delivered.click()

        await expect(dispatchpage.approve_dispatch).toBeVisible()

    })


})


