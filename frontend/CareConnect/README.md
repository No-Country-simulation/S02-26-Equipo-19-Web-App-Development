# CareConnect — Frontend

Frontend de la aplicación CareConnect (Vite + React). Sistema de gestión integral para servicios de acompañamiento domiciliario, diseñado para centralizar la operación, el seguimiento de pacientes y la gestión de cuidadores.

## 🚀 Tecnologías Utilizadas

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Estilos**: [TailwindCSS](https://tailwindcss.com/)
- **Estado Global**: [Zustand](https://github.com/pmndrs/zustand)
- **Ruteo**: [React Router DOM](https://reactrouter.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Notificaciones**: [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)

## ✨ Funcionalidades Clave

- **Panel de Administración**: Visualización de métricas críticas (cuidadores activos, pacientes, horas trabajadas).
- **Gestión de Entidades (ABM)**: Módulos completos para administrar Cuidadores, Pacientes y Usuarios.
- **Sistema de Búsqueda y Filtrado**: Componentes reutilizables para búsqueda en tiempo real y filtrado por estados/roles.
- **Flujo de Datos Estandarizado**: Arquitectura desacoplada siguiendo el patrón `Page → Hook → Service`.
- **Modales Dinámicos**: Interfaz premium para la carga y edición de datos.
- **Navegación por Roles**: Accesos diferenciados para ADMINISTRADORES, CUIDADORES y FAMILIARES.

## 📂 Estructura de Carpetas

```
src/
├── components/      # Componentes de la aplicación
│   ├── common/      # Componentes genéricos y reutilizables (Button, Table, Input, etc.)
│   └── layout/      # Componentes estructurales (Header, Sidebar)
├── constants/       # Constantes globales del sistema
├── hooks/           # Custom hooks para lógica de negocio y consumo de datos
├── pages/           # Vistas principales organizadas por dominio
│   ├── admin/       # Vistas exclusivas del rol administrador
│   ├── caregiver/   # Vistas para acompañantes
│   ├── family/      # Vistas para familiares/pacientes
│   └── home/        # Pantalla de inicio y login
├── router/          # Configuración de rutas (AppRouter)
├── services/        # Capa de servicios para comunicación con la API (Mocks incluidos)
├── store/           # Gestión de estado global con Zustand
└── utils/           # Utilidades y manejadores de errores centralizados
```

## 🛠️ Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/No-Country-simulation/S02-26-Equipo-19-Web-App-Development.git
   cd S02-26-Equipo-19-Web-App-Development/frontend/CareConnect
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar desarrollo**:
   ```bash
   npm run dev
   ```
   El servidor iniciará en `http://localhost:5173`.

> [!NOTE]
> **Ejecución sin Backend**: El frontend está preparado para funcionar de forma **independiente** (standalone) mediante el uso de **mocks** en la capa de servicios. Esto permite previsualizar todas las vistas y flujos de usuario sin necesidad de tener el backend corriendo, ya que la conexión front-back aún se encuentra en proceso de integración.

---

## ⚙️ Configuración y Backend

Esta sección detalla cómo integrar el frontend con el backend local. 

### Variables de entorno

El frontend necesita apuntar al backend local. Crear un archivo `.env` en la raíz de `src` (o raíz del proyecto según configuración) con:

```
VITE_API_BASE_URL=http://localhost:8080
```

En el código, el baseURL se obtiene con `import.meta.env.VITE_API_BASE_URL`.

### Requisitos del Sistema
- Node.js 18+ y npm o yarn
- Git
- Backend corriendo en `http://localhost:8080` (ver repositorio de backend)

### Recomendaciones
- Usar la variable `VITE_API_BASE_URL` para configurar el punto de enlace.
- Asegurarse de tener habilitado CORS en el backend.

### Problemas comunes
- **Respuestas vacías**: La base de datos puede no tener datos cargados (chequear migraciones y crear datos de prueba).
- **Errores 409/500**: Revisar la respuesta JSON del backend (`ErrorResponse`) para detalles específicos.