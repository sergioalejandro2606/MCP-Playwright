import { expect, test } from '@playwright/test';

const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
const dashboardUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';
const username = process.env.ORANGEHRM_USERNAME ?? 'Admin';
const password = process.env.ORANGEHRM_PASSWORD ?? 'admin123';
const invalidUsername = process.env.ORANGEHRM_INVALID_USERNAME ?? 'wronguser';
const invalidPassword = process.env.ORANGEHRM_INVALID_PASSWORD ?? 'wrongpass';

test.describe('Autenticación, validaciones y cierre de sesión', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('LOGIN-001 — Login exitoso', async ({ page }) => {
    // Ingresar las credenciales demo y seleccionar Login.
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(dashboardUrl);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('LOGIN-002 — Ambos campos vacíos', async ({ page }) => {
    // Seleccionar Login sin completar ningún campo.
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByText('Required', { exact: true })).toHaveCount(2);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('LOGIN-003 — Username informado / Password vacío', async ({ page }) => {
    // Ingresar Admin en Username, dejar Password vacío y seleccionar Login.
    const usernameField = page.getByRole('textbox', { name: 'Username' });
    await usernameField.fill(username);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByText('Required', { exact: true })).toBeVisible();
    await expect(usernameField).toHaveValue(username);
  });

  test('LOGIN-004 — Username vacío / Password informado', async ({ page }) => {
    // Dejar Username vacío, ingresar la contraseña demo y seleccionar Login.
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByText('Required', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('LOGIN-005 — Credenciales incorrectas', async ({ page }) => {
    // Ingresar credenciales incorrectas y seleccionar Login.
    await page.getByRole('textbox', { name: 'Username' }).fill(invalidUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(invalidPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials');
    await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('');
  });

  test('LOGIN-006 — Usuario válido / contraseña incorrecta', async ({ page }) => {
    // Ingresar el usuario demo con una contraseña incorrecta y seleccionar Login.
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(invalidPassword);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials');
    await expect(page.getByRole('textbox', { name: 'Username' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('');
  });

  test('LOGIN-007 — Usuario inválido / contraseña válida', async ({ page }) => {
    // Ingresar un usuario distinto al demo con la contraseña demo y seleccionar Login.
    await page.getByRole('textbox', { name: 'Username' }).fill(invalidUsername);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('LOGIN-008 — Contraseña enmascarada', async ({ page }) => {
    // Ingresar la contraseña demo y comprobar el tipo y el valor del campo.
    const passwordField = page.getByRole('textbox', { name: 'Password' });
    await passwordField.fill(password);

    await expect(passwordField).toHaveAttribute('type', 'password');
    await expect(passwordField).toHaveValue(password);
  });

  test('LOGIN-009 — Logout', async ({ page }) => {
    // Iniciar sesión, abrir el menú de cuenta y seleccionar Logout.
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(dashboardUrl);

    await page.getByText('manda user', { exact: true }).click();
    await page.getByText('Logout', { exact: true }).click();

    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('LOGIN-010 — Acceso a ruta protegida después de Logout', async ({ page }) => {
    // Iniciar sesión, cerrar sesión y navegar directamente a la ruta del Dashboard.
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(dashboardUrl);

    await page.getByText('manda user', { exact: true }).click();
    await page.getByText('Logout', { exact: true }).click();
    await expect(page).toHaveURL(loginUrl);

    await page.goto(dashboardUrl);
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
