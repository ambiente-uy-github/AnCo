# AnCo UI

Aplicación frontend construida con Angular v20 (carpeta del proyecto: `frontend/anco-ui`).

Este README contiene instrucciones en Windows/PowerShell para instalar dependencias, ejecutar la aplicación en desarrollo y realizar comprobaciones rápidas.

## Requisitos previos

- Node.js (recomendado LTS, Node 18+). Comprueba la versión con `node -v`.
- npm (incluido con Node) o un gestor de paquetes compatible.
- Git (opcional) para clonar o actualizar el repositorio.

## Instalar dependencias

Abre PowerShell y ejecuta:

```powershell
cd C:\xampp\htdocs\AnCo\frontend\anco-ui
npm install
```

Esto instalará las dependencias del `package.json`.

## Levantar servidor de desarrollo

Para arrancar el servidor de desarrollo (Angular CLI):

```powershell
npm run start
# o
ng serve
```

Abre el navegador en:

http://localhost:4200/

## Compilar para producción

```powershell
npm run build
```

Los artefactos de compilación se generarán en `dist/` por defecto.