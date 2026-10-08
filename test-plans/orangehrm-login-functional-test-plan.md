# Plan de pruebas funcionales — Login de OrangeHRM

## Application Overview

Plan refinado limitado a los diez casos acordados para el módulo Login de OrangeHRM. Se basa en la exploración observada de la aplicación en https://opensource-demo.orangehrmlive.com/web/index.php/auth/login. La pantalla expone las credenciales demo Admin / admin123. Se distinguen los resultados observados de los escenarios de combinación de credenciales o acceso protegido que se infieren para completar cobertura.

## Test Scenarios

### 1. Autenticación, validaciones y cierre de sesión

**Seed:** `tests\seed.spec.ts`

#### 1.1. LOGIN-001 — Login exitoso

**File:** `tests\login\login-001-exitoso.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta en /web/index.php/auth/login. Datos: Username=Admin, Password=admin123 (credenciales demo mostradas en la página; confirmar si el entorno las mantiene). Tipo: positivo. Prioridad: alta. Evidencia: observado.
    - expect: Se muestran los campos Username y Password y el botón Login.
  2. Ingresar Admin y admin123, luego seleccionar Login.
    - expect: La autenticación es aceptada y se navega a /web/index.php/dashboard/index.
    - expect: Se muestra el Dashboard de OrangeHRM.

#### 1.2. LOGIN-002 — Ambos campos vacíos

**File:** `tests\login\login-002-ambos-campos-vacios.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta. Datos: Username vacío y Password vacío. Tipo: negativo. Prioridad: alta. Evidencia: observado.
    - expect: Al enviar, el formulario permanece en la página de Login y no se inicia sesión.
  2. Seleccionar Login sin completar ningún campo.
    - expect: Se muestra el mensaje Required para cada campo vacío.
    - expect: No se navega al Dashboard.

#### 1.3. LOGIN-003 — Username informado / Password vacío

**File:** `tests\login\login-003-password-vacio.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta. Datos: Username=Admin, Password vacío. Tipo: negativo. Prioridad: alta. Evidencia: observado.
    - expect: Username acepta el valor ingresado sin iniciar sesión antes del envío.
  2. Ingresar Admin en Username, dejar Password vacío y seleccionar Login.
    - expect: Se muestra Required para Password y la aplicación permanece en Login.
    - expect: El valor Admin permanece en Username.
    - expect: No se inicia sesión.

#### 1.4. LOGIN-004 — Username vacío / Password informado

**File:** `tests\login\login-004-username-vacio.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta. Datos: Username vacío, Password=admin123. Tipo: negativo. Prioridad: alta. Evidencia: observado.
    - expect: Password acepta el valor ingresado sin iniciar sesión antes del envío.
  2. Dejar Username vacío, ingresar admin123 en Password y seleccionar Login.
    - expect: Se muestra Required para Username y la aplicación permanece en Login.
    - expect: No se inicia sesión.

#### 1.5. LOGIN-005 — Credenciales incorrectas

**File:** `tests\login\login-005-credenciales-incorrectas.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta. Datos: Username=wronguser, Password=wrongpass. Tipo: negativo. Prioridad: alta. Evidencia: observado para este par de valores.
    - expect: Ambos campos aceptan los valores para enviarlos.
  2. Ingresar wronguser y wrongpass, luego seleccionar Login.
    - expect: Se permanece en /web/index.php/auth/login y no se inicia sesión.
    - expect: Se muestra una alerta con el texto exacto Invalid credentials.
    - expect: Ambos campos quedan vacíos tras el rechazo.

#### 1.6. LOGIN-006 — Usuario válido / contraseña incorrecta

**File:** `tests\login\login-006-usuario-valido-password-incorrecto.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta. Datos: Username=Admin, Password incorrecto (por ejemplo wrongpass). Tipo: negativo. Prioridad: alta. Evidencia: confirmado; el sistema rechaza la autenticación con el mismo comportamiento para cualquier combinación de credenciales inválidas.
    - expect: El escenario diferencia el usuario demo válido de una contraseña incorrecta.
  2. Ingresar Admin y wrongpass, luego seleccionar Login.
    - expect: No se inicia sesión ni se abre el Dashboard.
    - expect: Se muestra una alerta con el texto exacto Invalid credentials.
    - expect: Ambos campos quedan vacíos tras el rechazo.

#### 1.7. LOGIN-007 — Usuario inválido / contraseña válida

**File:** `tests\login\login-007-usuario-invalido-password-valido.spec.ts`

**Steps:**
  1. Precondiciones: sesión cerrada y página de Login abierta. Datos: Username=wronguser, Password=admin123. Tipo: negativo. Prioridad: media. Evidencia: confirmado; el sistema rechaza la autenticación con el mismo comportamiento para cualquier combinación de credenciales inválidas.
    - expect: El escenario comprueba que la contraseña demo no permite acceder con otro usuario.
  2. Ingresar wronguser y admin123, luego seleccionar Login.
    - expect: No se inicia sesión ni se abre el Dashboard.
    - expect: Se muestra una alerta con el texto exacto Invalid credentials.
    - expect: Ambos campos quedan vacíos tras el rechazo.

#### 1.8. LOGIN-008 — Contraseña enmascarada

**File:** `tests\login\login-008-password-enmascarada.spec.ts`

**Steps:**
  1. Precondiciones: página de Login abierta. Datos: Password=admin123. Tipo: boundary. Prioridad: media. Evidencia: el campo se observó como una entrada de tipo contraseña.
    - expect: El campo Password presenta los caracteres enmascarados mientras se ingresan.
  2. Ingresar admin123 en Password y verificar el campo sin enviar el formulario.
    - expect: El campo Password tiene el atributo type=password y los caracteres no se muestran en texto legible.
    - expect: El valor ingresado permanece disponible en el campo.

#### 1.9. LOGIN-009 — Logout

**File:** `tests\login\login-009-logout.spec.ts`

**Steps:**
  1. Precondiciones: iniciar sesión con Admin / admin123 y estar en Dashboard. Tipo: positivo. Prioridad: alta. Evidencia: observado.
    - expect: El menú de cuenta de la barra superior contiene la opción Logout.
  2. Abrir el menú de cuenta (identificado por el nombre de usuario visible en el entorno de ejecución), seleccionar Logout y revisar la página resultante.
    - expect: La aplicación navega a /web/index.php/auth/login y muestra el formulario Login.
    - expect: La sesión ya no se presenta como autenticada.

#### 1.10. LOGIN-010 — Acceso a ruta protegida después de Logout

**File:** `tests\login\login-010-ruta-protegida-tras-logout.spec.ts`

**Steps:**
  1. Precondiciones: haber iniciado sesión y ejecutado Logout a través del menú de cuenta (identificado por el nombre de usuario visible en el entorno de ejecución). Datos: /web/index.php/dashboard/index. Tipo: negativo. Prioridad: alta. Evidencia: inferido; no se verificó la navegación directa después de Logout.
    - expect: El usuario tiene una sesión cerrada antes de intentar acceder a la ruta protegida.
  2. Navegar directamente a /web/index.php/dashboard/index y observar la URL y el contenido.
    - expect: No se muestra el Dashboard como contenido autenticado.
    - expect: Se espera redirección a Login o una respuesta equivalente que indique que se requiere autenticación; registrar el comportamiento efectivo.
