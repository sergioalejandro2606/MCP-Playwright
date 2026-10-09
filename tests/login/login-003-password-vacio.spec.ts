import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData, paths } from '../../data/loginData';

test.describe('LOGIN-003 — Username informado / Password vacío', () => {
  test('Debe mostrar Required en Password y conservar el valor de Username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillUsername(loginData.usernameOnlyLogin.username);
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL(paths.login);
    await expect(loginPage.getRequiredErrors()).toBeVisible();
    await expect(loginPage.getUsernameField()).toHaveValue(loginData.usernameOnlyLogin.username);
  });
});
