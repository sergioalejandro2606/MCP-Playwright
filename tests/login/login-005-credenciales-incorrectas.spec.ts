import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData, paths } from '../../data/loginData';

test.describe('LOGIN-005 — Credenciales incorrectas', () => {
  test('Debe mostrar Invalid credentials y vaciar los campos al enviar ambas credenciales inválidas', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.bothInvalidCredentials.username, loginData.bothInvalidCredentials.password);

    await expect(page).toHaveURL(paths.login);
    await expect(loginPage.getErrorAlert()).toHaveText('Invalid credentials');
    await expect(loginPage.getUsernameField()).toHaveValue('');
    await expect(loginPage.getPasswordField()).toHaveValue('');
  });
});
