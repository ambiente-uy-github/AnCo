# 🧱 Backend AnCo  
**API REST con CodeIgniter 3 + PostgreSQL + Composer**

**Backend AnCo (Analizador de Contratos)** es un nuevo desarrollo realizado desde cero , para el Ministerio de Ambiente, pensado como núcleo de servicios para gestión de **empresas y contratos que envían datos continuos por Web Service**, 
consumido por un **frontend Angular**.  
El proyecto se documenta y estructura profesionalmente para trabajo en equipo (backend / frontend / project manager).

---

## 🚀 Tecnologías principales

| Componente | Descripción |
|-------------|-------------|
| **Framework Backend** | [CodeIgniter 3](https://codeigniter.com/) |
| **PHP version** | versión 7.4.29  |
| **REST API** | [codeigniter-restserver (chriskacerguis)](https://github.com/chriskacerguis/codeigniter-restserver) |
| **Base de datos** | PostgreSQL 9.4 (base ya existente) |
| **Autoload / Dependencias** | Composer |
| **Configuración de entorno** | `environment.php` dinámico por constantes |
| **Cliente de pruebas** | Postman – Colección incluida |
| **Librerias a reutilizar** | MA_Module |

---

## 🧩 Estructura del proyecto

```
BackendAnCo/
│
├── application/
│   ├── controllers/
│   │   └── Home.php
│   │   └── Empresa.php
│   │   └── Contratos.php
│   │   └── etc.php
│   ├── core/
│   │   ├── MY_Controller.php
│   │   └── MY_Model.php
│   ├── libraries/
│   │   ├── php_modules/
│   │   │   └── Request.php
│   │   └── ma_modules/
│   │       └── PHP/
│   │           └── Auth/
│   │               ├── AuthAdminis.php
│   │               └── IAuth.php
│   ├── config/
│   └── views/
│       └── errors/html/error_php.php
│
├── system/
├── vendor/
├── index.php
├── environment.php
├── environmentEjemplo.php
├── composer.json
├── .gitignore
│
├── README.md
├── API_DOC.md
├── DATABASE.md
└── POSTMAN_COLLECTION.json
```

---

## ⚙️ Instalación y configuración inicial

### 1️⃣ Instalar dependencias
```bash
composer install
```

### 2️⃣ Configurar entorno
Crear y editar `environment.php` en la raíz del proyecto  
(ver ejemplo en `environmentEjemplo.php`).

```php
const DB_SVR_DEV = 'localhost';

$env = Env::getEnvironment('development');
```

### 3️⃣ Configurar base de datos
Editar `application/config/database.php` para usar las constantes definidas por `Env`.

### 4️⃣ Agregar libreria ma_modules y php_modules
Repositorio guit: 
https://github.com/ambiente-uy-github/ma_modules.git
https://github.com/ambiente-uy-github/php_modules.git
```

Si todo está correcto, deberías ver la respuesta:

```
Home controller
```

---

## 🧠 Buenas prácticas de desarrollo

- Respetar la estructura **MVC** nativa de CodeIgniter.  
- Cada módulo debe tener su propio **controller**, **model** y **servicio**.  
- Los endpoints REST deben probarse y documentarse con Postman.  
- Nombrar rutas siguiendo el esquema:  
  ```
  AnCo/backend/<recurso>/<acción>
  ```
- Mantener la configuración del entorno fuera del repositorio público (`.gitignore`).

---

## 🧾 Documentación complementaria

| Archivo | Descripción |
|----------|-------------|
| **API_DOC.md** | Endpoints disponibles y ejemplos de requests/responses. |
| **DATABASE.md** | Estructura y relaciones de la base PostgreSQL. |
| **POSTMAN_COLLECTION.json** | Colección Postman exportada para probar la API. |

---

## 🧩 Ejemplo básico de endpoint -- REVER DE NUEVO CUANDO SE AGREGUE LAS VERIIFICACIONES DE TOKEN

### `/Home` – Prueba de conexión

| Método | Endpoint | Descripción |
|--------|-----------|-------------|
| `GET` | `/Home` | Devuelve texto o JSON de prueba de la API. |

**Ejemplo:**
```bash
curl --location --request GET 'http://localhost/BackendAnCo/index.php/Home'
```

**Respuesta esperada:**
```json
{
  "status": "success",
  "message": "Home controller"
}
```

---

## 🗄️ Base de datos

Base principal: `recepcion_datos_admin`

Relaciones clave:

- 1 empresa → N contratos  
- 1 usuario → N empresas  
- 1 contrato → 1 empresa  

Más información en [`DATABASE.md`](./DATABASE.md)

---

## 📦 Colección Postman

El archivo `POSTMAN_COLLECTION.json` contiene los endpoints disponibles para pruebas locales.

Importar en Postman → *File > Import > Collection v2.1*

---

## 👥 Autores y créditos

**Backend Developer:** Cam  
**Frontend:** Equipo Angular  Mateo
**Project Manager:** Agustina y Rodrigo

---

## 🧱 Versión actual
**Backend AnCo v1.0.0** – Estructura base funcional y entorno listo para integración con frontend.

---
### Endpoints activos
- GET /empresa
- GET /empresa/{id}
- POST /empresa
- PUT /empresa/{id}
- DELETE /empresa/{id}

> Proyecto para el Ministerio de Ambiente, de la Republica Oriental del Uruguay en desarrollo – © 2025 AnCo Systems
