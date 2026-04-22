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

    // Enter odoo.sh dashboard
    await page.locator('#login_field').fill('kiariekevin22@gmail.com')
    await page.locator('#password').fill('$kingara120')
    await page.click('input[type="submit"][value="Sign in"]');
    await expect(page.getByRole('link', {name: 'ponty-erp'})).toBeVisible()

    //Open odoo-staging application
    await page.getByRole('link',{name: 'Open'}).click()
    await expect(page).toHaveURL('https://www.odoo.sh/project/ponty-erp')

})