import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { paths } from '../../data/loginData';

test.describe('LOGIN-002 — Ambos campos vacíos', () => {
  test('Debe mostrar dos mensajes Required al enviar el formulario sin datos', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigate();
    await loginPage.clickLoginButton();

    await expect(page).toHaveURL(paths.login);
    await expect(loginPage.getRequiredErrors()).toHaveCount(2);
    await expect(loginPage.getHeading()).toBeVisible();
  });
});
