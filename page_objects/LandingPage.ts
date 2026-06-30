import { expect, Locator, Page } from '@playwright/test'
import { Basepage } from './BasePage'
import dotenv from 'dotenv'
import { dot } from 'node:test/reporters'

dotenv.config()
export class LandinPage extends Basepage{
    constructor(page:Page){
        super(page)
    }

    async github_authorize_odoo(){
        const authorize_button = await this.page.getByRole('button', { name: 'Authorize odoo'})

        if (await authorize_button.isVisible({timeout:3000}).catch(() => false)) {
            await authorize_button.click()
        }
    
    }

    async open_landing_page(): Promise<Page>{
        await this.page.goto('/')
        await this.page.getByRole('link', {name: 'Sign in'}).click()

        // // Enter odoo.sh dashboard through github
        await this.page.locator('#login_field').fill(process.env.GITHUB_USERNAME!)
        await this.page.locator('#password').fill(process.env.GITHUB_PASSWORD!)
        
        await this.page.click('input[type="submit"][value="Sign in"]');
       
        if (this.page.url() != "https://www.odoo.sh/project"){
            
            this.github_authorize_odoo()
        }
        await expect(this.page.getByRole('link', {name: 'ponty-erp'})).toBeVisible({timeout: 10000})

        //Open odoo sh
        await this.page.getByRole('link',{name: 'Open'}).click()
        await expect(this.page).toHaveURL('https://www.odoo.sh/project/ponty-erp')

        // Open staging application
        await this.page.locator('span.o_paas_branch a[href="/project/ponty-erp/branches/staging"]').click();
        const [stagingPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.getByRole('link', { name: 'CONNECT' }).click()
        ]);

        await stagingPage.waitForLoadState();

        // const banner = this.page.locator('#oe_neutralize_banner');

        // await expect(banner).toBeVisible();

        return stagingPage;   
    
    }
}