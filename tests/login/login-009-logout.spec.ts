import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { loginData, paths } from '../../data/loginData';

test.describe('LOGIN-009 — Logout', () => {
  test('Debe redirigir al Login y mostrar el formulario tras cerrar sesión', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(loginData.successfulLogin.username, loginData.successfulLogin.password);
    await expect(page).toHaveURL(paths.dashboard);

    await dashboardPage.logout();

    await expect(page).toHaveURL(paths.login);
    await expect(loginPage.getHeading()).toBeVisible();
  });
});
