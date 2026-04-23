import { test, expect } from "@playwright/test"
import { OdooShPage } from "../page_objects/OdooShPage"

let odoosh: OdooShPage




test ('open odoo staging', async({page}) => {
    odoosh = new OdooShPage(page)
    await odoosh.visit()

    // Click my projects drop down
    await page.getByRole('link', {name: 'Sign in'}).click()

    // Enter odoo.sh dashboard
    await page.locator('#login_field').fill('kiariekevin22@gmail.com')
    await page.locator('#password').fill('$kingara120')
    await page.click('input[type="submit"][value="Sign in"]');
    await expect(page.getByRole('link', {name: 'ponty-erp'})).toBeVisible()

    //Open odoo sh
    await page.getByRole('link',{name: 'Open'}).click()
    await expect(page).toHaveURL('https://www.odoo.sh/project/ponty-erp')

    // Open staging application
    await page.locator('span.o_paas_branch a[href="/project/ponty-erp/branches/staging"]').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'CONNECT' }).click();
    const page1 = await page1Promise;
    await page1.getByRole('option', { name: 'Dispatch' }).click();
    await page1.goto('https://ponty-erp-staging-31243847.dev.odoo.com/odoo/action-624');

    await page1.getByText('January 2023 (3003)').click();
    await page1.getByText(/Cancelled/).click();
    await page1.getByRole('cell', { name: 'PPD/PPD/KAQ216M' }).click();
    await page1.getByRole('heading').locator('div').filter({ hasText: /^PDO05311$/ }).click();
    await page1.getByRole('button', { name: 'Reset to draft' }).click();
    await page1.goto('https://ponty-erp-staging-31243847.dev.odoo.com/odoo/action-624/5154');

   


})
