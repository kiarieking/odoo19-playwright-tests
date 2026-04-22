import { test, expect } from "@playwright/test"

test ('has title', async({page}) => {
    await page.goto('https://www.odoo.sh/')

    // Expect odoo.sh page title
    await expect(page).toHaveTitle("The Odoo Cloud Platform | Official Odoo Hosting")
})