import { test, expect } from "@playwright/test"
import { OdooShPage } from "../page_objects/OdooShPage"
import { LandinPage } from "../page_objects/LandingPage"
import { DispatchPage } from "../page_objects/DispatchPage"

let odoosh: OdooShPage
let landingpage: LandinPage
let dispatchpage: DispatchPage




test ('open odoo staging', async({page}) => {
    odoosh = new OdooShPage(page)
    await odoosh.visit()
    landingpage = new LandinPage(page)
    dispatchpage = new DispatchPage(page)

    await odoosh.open_odoo_staging()

    await landingpage.open_landing_page()

    await dispatchpage.openDispatch()


})
