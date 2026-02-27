# CareConnect — Frontend

Frontend de la aplicación CareConnect (Vite + React). Este README explica cómo levantar el proyecto en desarrollo, configurar variables y consumir el backend local.

## Requisitos
- Node.js 18+ y npm o yarn
- Git
- Backend corriendo en `http://localhost:8080` (ver `../backend`)

## Instalación

1. Clonar el repositorio (si no está):

```bash
git clone <repo-url>
cd <repo-folder>/frontend/CareConnect
```

2. Instalar dependencias:

```bash
npm install

# o yarn
# yarn install
```

## Scripts útiles

- `npm run dev` — Inicia el servidor de desarrollo (Vite) en `http://localhost:5173` por defecto.
- `npm run build` — Genera la carpeta `dist` para producción.
- `npm run preview` — Sirve la build localmente para pruebas.
- `npm run lint` — Ejecuta ESLint (si está configurado).

Ejecutar desarrollo:

```bash
npm run dev
```

## Variables de entorno

El frontend puede necesitar apuntar al backend local. Por conveniencia el proyecto puede usar una variable `VITE_API_BASE_URL`.

Crear un archivo `.env` en la raíz de `frontend/CareConnect` con:

```
VITE_API_BASE_URL=http://localhost:8080
```

En el código, el baseURL se obtiene con `import.meta.env.VITE_API_BASE_URL`.

## Estructura del proyecto

- `src/main.jsx` — punto de entrada
- `src/App.jsx` — componente raíz
- `src/components` — componentes reutilizables
- `src/pages` — vistas por rol/página
- `src/services` — llamadas a API

## Recomendaciones

- Usar la variable `VITE_API_BASE_URL` para apuntar al backend.
- Habilitar CORS en backend si haces peticiones desde otro origen (en dev usualmente `localhost:5173`).

## Problemas comunes

- Si ves respuestas vacías: la base de datos puede no tener datos seed (chequear migraciones y crear datos de prueba).
- Errores 409/500: revisar la respuesta JSON del backend (`ErrorResponse`) para mensaje y timestamp.
