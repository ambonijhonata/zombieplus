const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { Toast } = require('../pages/Components');

let loginPage;
let toast;
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
})

test('deve logar como ADM', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await loginPage.isLoggedIn();
});

test('nao deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'abc123');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';

    await toast.haveText(message)
});

test('nao deve logar quando o email é invalido', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('www.teste.com.br', 'abc123');

    const messageEmailRequired = 'Email incorreto'
    await loginPage.isAlertEmailHaveText(messageEmailRequired);
});

test('nao deve logar quando o email não é preenchido', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('', 'abc123');

    const messageEmailRequired = 'Campo obrigatório'
    await loginPage.isAlertEmailHaveText(messageEmailRequired);
});

test('nao deve logar quando a senha não é preenchida', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', '');

    const messagePasswordRequired = 'Campo obrigatório'
    await loginPage.isAlertPasswordHaveText(messagePasswordRequired);
});

test('nao deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('', '');

    const messageFieldRequired = 'Campo obrigatório'
    await loginPage.isAlertEmailHaveText(messageFieldRequired);
    await loginPage.isAlertPasswordHaveText(messageFieldRequired);
});