import { test, expect } from "@playwright/test"
import { LandinPage } from "../page_objects/LandingPage"
import { DispatchPage } from "../page_objects/DispatchPage"



test.describe.parallel('Dispatch workflow', () => {

    test ('open odoo staging', async({page}) => {

    test.setTimeout(60000)
    const landingpage = new LandinPage(page)
    const stagingpage = await landingpage.open_landing_page();

    const dispatchpage = new DispatchPage(stagingpage)

    await dispatchpage.openDispatch()

    })

    test ('Reset cancelled dispatch to draft', async({page}) => {
        test.setTimeout(60000)
        const landingpage = new LandinPage(page)
        const stagingpage = await landingpage.open_landing_page();

        const dispatchpage = new DispatchPage(stagingpage)

        await dispatchpage.openDispatch()


    })



})


