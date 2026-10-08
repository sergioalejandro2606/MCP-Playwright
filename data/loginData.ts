export interface LoginTestData {
  testCaseId: string;
  description: string;
  username: string;
  password: string;
}

export const paths = {
  login: '/web/index.php/auth/login',
  dashboard: '/web/index.php/dashboard/index',
} as const;

/**
 * Nombre del usuario autenticado tal como aparece en el menú de la barra superior.
 * Depende de la cuenta activa en el entorno. Configurar en .env como ORANGEHRM_USER_DISPLAY_NAME.
 * Usado en: LOGIN-009, LOGIN-010.
 */
export const userDisplayName = process.env.ORANGEHRM_USER_DISPLAY_NAME!;

export const loginData = {
  // LOGIN-001 — Login exitoso
  successfulLogin: {
    testCaseId: 'LOGIN-001',
    description: 'Login exitoso con credenciales válidas',
    username: process.env.ORANGEHRM_USERNAME!,
    password: process.env.ORANGEHRM_PASSWORD!,
  } satisfies LoginTestData,

  // LOGIN-003 — Username informado / Password vacío
  usernameOnlyLogin: {
    testCaseId: 'LOGIN-003',
    description: 'Username informado con Password vacío',
    username: process.env.ORANGEHRM_USERNAME!,
    password: '',
  } satisfies LoginTestData,

  // LOGIN-004 — Username vacío / Password informado
  passwordOnlyLogin: {
    testCaseId: 'LOGIN-004',
    description: 'Username vacío con Password informado',
    username: '',
    password: process.env.ORANGEHRM_PASSWORD!,
  } satisfies LoginTestData,

  // LOGIN-005 — Credenciales incorrectas (ambos inválidos)
  bothInvalidCredentials: {
    testCaseId: 'LOGIN-005',
    description: 'Credenciales incorrectas — ambos campos inválidos',
    username: 'wronguser',
    password: 'wrongpass',
  } satisfies LoginTestData,

  // LOGIN-006 — Usuario válido / contraseña incorrecta
  validUserInvalidPassword: {
    testCaseId: 'LOGIN-006',
    description: 'Usuario válido con contraseña incorrecta',
    username: process.env.ORANGEHRM_USERNAME!,
    password: 'wrongpass',
  } satisfies LoginTestData,

  // LOGIN-007 — Usuario inválido / contraseña válida
  invalidUserValidPassword: {
    testCaseId: 'LOGIN-007',
    description: 'Usuario inválido con contraseña válida',
    username: 'wronguser',
    password: process.env.ORANGEHRM_PASSWORD!,
  } satisfies LoginTestData,

  // LOGIN-008 — Contraseña enmascarada (no se envía el formulario)
  maskedPassword: {
    testCaseId: 'LOGIN-008',
    description: 'Verificación de enmascaramiento del campo Password',
    username: '',
    password: process.env.ORANGEHRM_PASSWORD!,
  } satisfies LoginTestData,

  // LOGIN-009 y LOGIN-010 reutilizan successfulLogin para el paso de autenticación.
  // No requieren entrada propia porque sus datos de login son idénticos a LOGIN-001.
};
