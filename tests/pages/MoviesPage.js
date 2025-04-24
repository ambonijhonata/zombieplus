const { expect } = require('@playwright/test');

export class MoviesPage {
    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');//aguarda finalizar todas as requests

        const logoutLink = this.page.locator('.logout');

        await expect(logoutLink).toBeVisible();
        await expect(this.page).toHaveURL(/.*admin/);
    }
}