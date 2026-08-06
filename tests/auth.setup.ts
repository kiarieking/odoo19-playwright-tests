import { test as setup } from '@playwright/test'
import { LandinPage } from '../page_objects/LandingPage'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
    setup.setTimeout(90_000)

    const landingpage = new LandinPage(page)
    await landingpage.login()
    await page.context().storageState({ path: authFile })
})
