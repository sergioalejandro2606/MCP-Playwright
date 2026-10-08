import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { loginData, paths } from '../../data/loginData';

test.describe('LOGIN-010 — Acceso a ruta protegida después de Logout', () => {
  test('Debe redirigir al Login al intentar acceder al Dashboard tras cerrar sesión', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.successfulLogin.username, loginData.successfulLogin.password);
    await expect(page).toHaveURL(paths.dashboard);

    await dashboardPage.logout();
    await expect(page).toHaveURL(paths.login);

    await page.goto(paths.dashboard);

    await expect(page).toHaveURL(paths.login);
    await expect(loginPage.getHeading()).toBeVisible();
  });
});
