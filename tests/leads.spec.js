// @ts-check
import { test, expect } from '@playwright/test';
const { LandingPage } = require('./pages/LandingPage');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();

  await landingPage.submitLeadForm('jhonata', 'jhonata@gmail.com');

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await landingPage.toastHaveText(message);
});

//implementar o resto dos page object
test('nao deve cadastrar um lead na fila de espera com email incorreto', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();  

  await landingPage.openLeadModal();

  // busca por um elemento com o ID name 
  //await page.locator('#name').fill('jhonata@gmail.com'); 

  //procura um elemento input com a propriedade name
  //await page.locator('input[name=name]').fill('jhonata@gmail.com'); 

  //quando o seletor tiver espaço tem que estar entre aspas
  //await page.locator('input[placeholder="Seu nome completo"]').fill('jhonata@gmail.com'); 

  await landingPage.submitLeadForm('jhonata', 'jhonata.com.br')  

  await landingPage.alertModalHaveText('Email incorreto')  

});

test('nao deve cadastrar um lead na fila quando os dois campos estiverem vazio e exibir mensagens', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();  

  await landingPage.openLeadModal();  

  await landingPage.submitLeadForm('', '');  

  const message = 'Campo obrigatório';
  await landingPage.alertNameModalHaveText(message);

  await landingPage.alertEmailModalHaveText(message);

});

test('nao deve cadastrar um lead na fila quando o campo nome estiver vazio e exibir mensagem', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();  

  await landingPage.submitLeadForm('', 'jhonata.com');    

  await landingPage.alertNameModalHaveText('Campo obrigatório');
  
  await landingPage.alertEmailModalHaveText('Email incorreto');

  await landingPage.submitLeadForm('', 'jhonata@gmail.com');      

  await landingPage.alertNameModalHaveText('Campo obrigatório');  

});

test('nao deve cadastrar um lead na fila quando o campo email estiver vazio e exibir mensagem', async ({ page }) => {
  const landingPage = new LandingPage(page);

  await landingPage.visit();

  await landingPage.openLeadModal();  

  await landingPage.submitLeadForm('jhonata', '')  

  await landingPage.alertEmailModalHaveText('Campo obrigatório')  

});