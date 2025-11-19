# 📘 API Documentation – Backend AnCo

> Proyecto independiente – API REST desarrollada con **CodeIgniter 3**, **RESTServer** y **PostgreSQL**, consumida por una aplicación Angular.  
> Base URL local: `http://localhost/api.anco/`

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

---

## 🧱 1. Auth

### 🔹 POST `/auth/login`
**Descripción:** Autentica un usuario y devuelve un token JWT.  
**Body (JSON):**
```json
{
  "email": "usuario@empresa.com",
  "password": "123456"
}
```
**Respuesta (200):**
```json
{
  "status": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600
}
```

---

## 🏢 2. Empresas

### 🔹 GET `/empresa`
**Descripción:** Devuelve la lista de empresas registradas.  
**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "TechCorp",
    "ruc": "123456789",
    "email": "info@techcorp.com"
  }
]
```

### 🔹 POST `/empresa`
**Descripción:** Crea una nueva empresa.  
**Body (JSON):**
```json
{
  "nombre": "Nueva Empresa",
  "ruc": "987654321",
  "email": "nueva@empresa.com"
}
```
**Respuesta (201):**
```json
{
  "status": true,
  "message": "Empresa creada correctamente"
}
```

### 🔹 PUT `/empresa/{id}`
**Descripción:** Actualiza los datos de una empresa existente.  
**Body (JSON):**
```json
{
  "nombre": "Empresa Actualizada",
  "email": "nuevo@correo.com"
}
```
**Respuesta (200):**
```json
{
  "status": true,
  "message": "Datos actualizados"
}
```

### 🔹 DELETE `/empresa/{id}`
**Descripción:** Elimina una empresa por su ID.  
**Respuesta (200):**
```json
{
  "status": true,
  "message": "Empresa eliminada"
}
```

---

## 📄 3. Contratos

### 🔹 GET `/contrato`
**Descripción:** Devuelve los contratos activos.  
**Respuesta (200):**
```json
[
  {
    "id": 12,
    "empresa_id": 1,
    "tipo": "servicio",
    "monto": 3500,
    "fecha_inicio": "2025-10-01",
    "fecha_fin": "2026-10-01"
  }
]
```

### 🔹 POST `/contrato`
**Descripción:** Crea un nuevo contrato asociado a una empresa.  
**Body (JSON):**
```json
{
  "empresa_id": 1,
  "tipo": "consultoría",
  "monto": 4500,
  "fecha_inicio": "2025-11-01",
  "fecha_fin": "2026-05-01"
}
```
**Respuesta (201):**
```json
{
  "status": true,
  "message": "Contrato creado correctamente"
}
```

---

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
- Base de datos: PostgreSQL.  
- Framework: CodeIgniter 3 + RESTServer.  
- Documentación y pruebas: Postman (`POSTMAN_COLLECTION.json`).  
- Entorno local: `http://localhost/api.anco`

---
© 2025 Backend AnCo – Equipo de Desarrollo
