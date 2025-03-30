const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage')

let loginPage;
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
})

test('deve logar como ADM', async ({ page }) => {
    await loginPage.visit();

    await loginPage.submit('admin@zombieplus.com', 'pwd123');

    await loginPage.isLoggedIn();
});