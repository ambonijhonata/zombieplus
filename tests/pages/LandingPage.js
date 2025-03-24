const {expect} = require('@playwright/test');

export class LandingPage {

constructor(page) {
    this.page = page;
}

    async visit() {
        await this.page.goto('http://localhost:3000/');
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera')
    }

    async submitLeadForm(name, email) {
        await this.page.locator('#name').fill(name);

        await this.page.locator('#email').fill(email);

        await this.page.getByTestId('modal').getByText('Quero entrar na fila!').click();
    }

    async toastHaveText(message) {        
        await expect(
            this.page.locator('.toast')
        ).toHaveText(message);

        //aguarda o elemento .toast ficar invisivel em até dois segundos
        await expect(this.page.locator('.toast')).toBeHidden({ timeout: 5000 });
    }

    async alertModalHaveText(message){
        await expect(
            this.page.locator('.alert')
          ).toHaveText(message);
    }

    async alertNameModalHaveText(message) {
        await expect(
            this.page.locator('label[for=name]').locator('.alert')
          ).toHaveText(message);
    }

    async alertEmailModalHaveText(message) {
        await expect(
            this.page.locator('label[for=email]').locator('.alert')
          ).toHaveText(message);
    }
}