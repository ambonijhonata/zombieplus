// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: /Aperte o play/ }).click();

  /*busca pelo elemento que tem a propriedade modal, depois busca os elementos de 
  /cabeçalho(h1,h2,, ...,hn...), util para validar estrutura de elementos*/
  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  // busca por um elemento com o ID name 
  //await page.locator('#name').fill('jhonata@gmail.com'); 

  //procura um elemento input com a propriedade name
  //await page.locator('input[name=name]').fill('jhonata@gmail.com'); 

  //quando o seletor tiver espaço tem que estar entre aspas
  //await page.locator('input[placeholder="Seu nome completo"]').fill('jhonata@gmail.com'); 

  await page.getByPlaceholder('Seu nome completo').fill('jhonata');

  await page.locator('#email').fill('jhonata@gmail.com');

  //busca o elemento pelo texto e clica
  //await page.getByText('Quero entrar na fila!').click();

  await page.getByTestId('modal').getByText('Quero entrar na fila!').click();

  await page.getByText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!').click();
  //busca o html do elemento que clicou na linha de cima
  const content = await page.content();
  console.log(content);//print no console da UI do playwright, dai la da de pegar o class .toast usado abaixo

  await expect(
    page.locator('.toast')
  ).toHaveText('Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!');  

  //aguarda o elemento .toast ficar invisivel em até dois segundos
  await expect(page.locator('.toast')).toBeHidden({timeout: 5000});
  await page.waitForTimeout(5000);
});
