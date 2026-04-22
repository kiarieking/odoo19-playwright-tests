import { test, expect } from "@playwright/test"

// test ('has title', async({page}) => {
//     await page.goto('https://www.odoo.sh/')

//     // Expect odoo.sh page title
//     await expect(page).toHaveTitle("The Odoo Cloud Platform | Official Odoo Hosting")
// })

test ('open odoo staging', async({page}) => {
    await page.goto('https://www.odoo.sh/')

    // Click my projects drop down
    await page.getByRole('link', {name: 'Sign in'}).click()
    await page.getByRole('button', {name: 'kiarie kevin'}).click()
    await page.getByRole('menuitem', {name: 'My Project(s)'}).click()

    // Expect ponty-erp to be visible
    await expect(page.getByRole('link', {name: 'ponty-erp'})).toBeVisible()

})