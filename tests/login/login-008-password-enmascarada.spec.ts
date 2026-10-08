import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData } from '../../data/loginData';

test.describe('LOGIN-008 — Contraseña enmascarada', () => {
  test('Debe tener type=password y conservar el valor ingresado sin enviar el formulario', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillPassword(loginData.maskedPassword.password);

    await expect(loginPage.getPasswordField()).toHaveAttribute('type', 'password');
    await expect(loginPage.getPasswordField()).toHaveValue(loginData.maskedPassword.password);
  });
});
