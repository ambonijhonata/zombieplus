const { expect } = require('@playwright/test');

export class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login');

        const loginForm = this.page.locator('.login-form');

        await expect(loginForm).toBeVisible();
    }

    async submit(email, password) {
        await this.page.getByPlaceholder('E-mail').fill(email);
        await this.page.getByPlaceholder('Senha').fill(password);
        await this.page.getByText('Entrar').click();
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');//aguarda finalizar todas as requests

        const logoutLink = this.page.locator('.logout');

        await expect(logoutLink).toBeVisible();
        await expect(this.page).toHaveURL(/.*admin/);
    }    
    
}