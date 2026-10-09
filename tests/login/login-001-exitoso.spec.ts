import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { loginData, paths } from '../../data/loginData';

test.describe('LOGIN-001 — Login exitoso', () => {
  test('Debe navegar al Dashboard al ingresar credenciales válidas', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.successfulLogin.username, loginData.successfulLogin.password);

    await expect(page).toHaveURL(paths.dashboard);
    await expect(dashboardPage.getHeading()).toBeVisible();
  });
});
