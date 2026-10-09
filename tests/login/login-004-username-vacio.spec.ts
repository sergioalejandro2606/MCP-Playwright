import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { loginData, paths } from '../../data/loginData';

test.describe('LOGIN-004 — Username vacío / Password informado', () => {
  test('Debe mostrar Required en Username al enviar sin él', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.fillPassword(loginData.passwordOnlyLogin.password);
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL(paths.login);
    await expect(loginPage.getRequiredErrors()).toBeVisible();
    await expect(loginPage.getHeading()).toBeVisible();
  });
});
