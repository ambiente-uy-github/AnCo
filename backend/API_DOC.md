# 📘 API Documentation – Backend AnCo

> Proyecto independiente – API REST desarrollada con **CodeIgniter 3**, **RESTServer** y **PostgreSQL**, consumida por una aplicación Angular.  
> Base URL local: `http://localhost/anco/backend/`

---

## 🧩 Estructura general

```
Backend AnCo API
│
├── 🔍 System - test
│   └── GET /Home
│
├── 🧱 Auth
│   ├── POST /auth/login
│   └── POST /auth/register
│
├── 🏢 Empresas
│   ├── GET /empresa
│   ├── POST /empresa
│   ├── PUT /empresa/{id}
│   └── DELETE /empresa/{id}
│
└── 📄 Contratos
    ├── GET /contrato
    └── POST /contrato
```

# 📘 API Documentation – Módulo Empresa

## 🔗 Base URL (desarrollo)

Con index.php:
```
http://localhost/AnCo/backend/index.php
```

Con rewrite habilitado:
```
http://localhost/AnCo/backend
```

---

# 🏢 Módulo: Empresa (CRUD)

Este módulo permite gestionar empresas: crear, listar, obtener, actualizar y eliminar.

---

# 📌 GET /empresa
Obtiene el listado completo de empresas.

### ✔️ Respuesta 200 OK
```json
{
  "ok": true,
  "description": "Listado de empresas",
  "data": [
    {
      "id_empresa": 1,
      "razon_social": "Mi Empresa S.A.",
      "rut": "123456789",
      "activo": 1,
      "usuario": "empresa1"
    }
  ]
}
```

---

# 📌 GET /empresa/{id}
Obtiene los datos de una empresa específica.

### ✔️ Respuesta 200 OK
```json
{
  "ok": true,
  "description": "Empresa encontrada",
  "data": {
    "id_empresa": 1,
    "razon_social": "Mi Empresa S.A.",
    "rut": "123456789",
    "activo": 1,
    "usuario": "empresa1"
  }
}
```

### ❌ Respuesta 404 Not Found
```json
{
  "ok": false,
  "description": "Empresa no encontrada",
  "data": null
}
```

---

# 📌 POST /empresa
Crea una empresa nueva.

### Body JSON requerido:
```json
{
  "razon_social": "Mi Empresa S.A.",
  "rut": "123456789",
  "activo": 1,
  "usuario": "empresa1",
  "pass": "empresatest"
}
```

### ✔️ Respuesta 201 Created
```json
{
  "ok": true,
  "description": "Empresa creada correctamente",
  "data": { "id": 10 }
}
```

### ❌ Respuesta 400 Bad Request
```json
{
  "ok": false,
  "description": "El campo razon_social es obligatorio",
  "data": []
}
```

---

# 📌 PUT /empresa/{id}
Actualiza los datos de una empresa existente.

### Body JSON:
```json
{
  "razon_social": "Mi Empresa Actualizada S.A.",
  "activo": 0
}
```

### ✔️ Respuesta 200 OK
```json
{
  "ok": true,
  "description": "Empresa actualizada correctamente",
  "data": null
}
```

### ❌ Respuesta 400 Bad Request
```json
{
  "ok": false,
  "description": "ID de empresa requerido",
  "data": []
}
```

---

# 📌 DELETE /empresa/{id}
Elimina una empresa.

### ✔️ Respuesta 200 OK
```json
{
  "ok": true,
  "description": "Empresa eliminada correctamente",
  "data": null
}
```

### ❌ Respuesta 404 Not Found
```json
{
  "ok": false,
  "description": "No se pudo eliminar la empresa",
  "data": []
}
```

---

# 📚 Notas finales
- Todos los endpoints retornan un formato consistente:
```json
{
  "ok": boolean,
  "description": "mensaje",
  "data": { ... }
}
```
- Para enviar JSON en POST y PUT:  
  **Header obligatorio:**
```
Content-Type: application/json
```

## 🔍 4. System

### 🔹 GET `/Home`
**Descripción:** Endpoint de prueba y estado del servidor.  
**Respuesta:**
```json
{
  "status": true,
  "app": "Backend AnCo",
  "version": "1.0.0",
  "timestamp": "2025-11-11 15:45:00"
}
```

---

## 📦 Notas para el equipo

- Todos los endpoints están preparados para autenticación JWT (a integrar próximamente).  
- Base de datos: MySql.  
- Framework: CodeIgniter 3 + RESTServer.  
- Documentación y pruebas: Postman (`POSTMAN_COLLECTION.json`).  
- Entorno local: `http://localhost/api.anco`

---
© 2025 Backend AnCo – Equipo de Desarrollo

