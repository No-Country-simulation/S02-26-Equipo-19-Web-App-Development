## Descripción del Proyecto
CareConnect es una plataforma web diseñada para gestionar integralmente servicios de acompañamiento domiciliario. Permite la administración de pacientes, cuidadores, reportes y usuarios, además de brindar paneles de métricas y herramientas para facilitar la operación diaria.

### Tecnologías principales
- **Backend:** Java 21, Spring Boot, Maven
- **Base de datos:** PostgreSQL (a través de scripts SQL de migración)
- **Frontend:** React (Vite + JSX), Tailwind CSS
- **Contenerización:** Docker y docker-compose para ambientes de desarrollo
- **Otras:** React Toastify para notificaciones, Lucide Icons, Fetch API personalizada

### Funcionalidades destacadas
- Gestión (ABM) de pacientes, cuidadores y usuarios desde el panel de administración
- Filtros y búsqueda en tablas de registro
- Formulario con validación básica y modales reutilizables
- Métricas principales en dashboard de administración
- Navegación role-based entre áreas de administrador, cuidador y familiar
- Manejo centralizado de errores y notificaciones emergentes
- Sistema de Dark Mode en toda la aplicación
- Componentes reutilizables y modulares

## Características por Rol

### 👤 Paciente
- Vista de reportes propios realizados por cuidadores
- Visualización de información personal
- Pantalla de bienvenida personalizada

### 👨‍⚕️ Cuidador
- Dashboard con lista de pacientes asignados
- Creación de reportes diarios sobre pacientes (medicación, actividades, signos vitales)
- Visualización de historial de reportes propios
- Gestión de pacientes asignados

### 👨‍👩‍👧 Familia
- Visualización de pacientes a cargo
- Acceso a reportes generados por cuidadores
- Monitoreo del estado de pacientes
- Seguimiento de actividades y cuidados

### 🔐 Administrador
- **Panel de Control:** Métricas generales (total usuarios, pacientes activos, reportes, etc.)
- **Gestión de Usuarios:** Ver, crear nuevos usuarios con asignación de roles
- **Gestión de Pacientes:** Ver lista completa, crear nuevos pacientes, editar datos
- **Gestión de Cuidadores:** Ver lista, crear nuevos cuidadores, asignarlos a pacientes
- **Gestión de Reportes:** Visualizar todos los reportes, aprobar o rechazar reportes de cuidadores
- **Filtros y búsqueda:** En todas las tablas de administración

## Estado de Funcionalidades

### ✅ Implementado
- Navegación por roles (selección de rol → vista correspondiente)
- Dashboard de administrador con métricas
- Listado de usuarios, pacientes, cuidadores y reportes
- Creación de nuevos pacientes y cuidadores
- Sistema de aprobación/rechazo de reportes
- Formularios con validación
- Sistema de Dark Mode
- Modales reutilizables
- Manejo de errores y notificaciones

### 🚧 Pendiente
- **Sistema real de autenticación/login:** Actualmente solo se selecciona un rol para acceder
- **Edición de usuarios/pacientes/cuidadores:** Necesita implementarse CRUD completo
- **Eliminación de usuarios/pacientes/cuidadores:** Solo se puede crear, no eliminar
- **Integración parcial de datos:** Las vistas de admin (usuarios, pacientes, cuidadores, reportes) consumen datos reales del servidor. Las vistas de cuidador y familia usan datos mock para demostración
- **Paginación avanzada:** En tablas grandes
- **Exportación de reportes:** A PDF o Excel
- **Notificaciones push:** Para alertas de reportes pendientes
- **Validación en backend:** Actualmente solo en frontend

## Instrucciones de Instalación y Ejecución

### Requisitos
- Node.js 18+ (frontend)
- Java 17+ (backend)
- PostgreSQL 14+ (base de datos)
- Docker y Docker Compose (opcional)

### Frontend

```bash
cd frontend/CareConnect
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

### Backend

```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```
El servidor estará disponible en `http://localhost:8080`

### Con Docker Compose

```bash
docker-compose up
```

## Estructura del Proyecto

```
├── frontend/
│   └── CareConnect/
│       ├── src/
│       │   ├── components/     # Componentes reutilizables
│       │   ├── pages/          # Vistas principales por rol
│       │   ├── hooks/          # Custom hooks (useUsers, usePatients, etc.)
│       │   ├── router/         # Configuración de rutas (AppRouter.jsx)
│       │   ├── services/       # Integraciones con API
│       │   ├── utils/          # Utilidades y helpers
│       │   ├── App.jsx
│       │   └── index.css       # Estilos globales y Dark Mode
│       └── package.json
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/team19/CareConnect/
│   │   │   └── resources/      # Configuración y migrations SQL
│   │   └── test/
│   └── pom.xml
└── README.md
```

## Cómo Probar

1. **Seleccionar rol:** En la pantalla de login, elige un rol (Administrador, Cuidador, Familia o Paciente)
2. **Acceder a la vista:** Serás redirigido a la pantalla correspondiente
3. **Explorar funcionalidades:** Navega por los menús disponibles según tu rol

**Nota:** El sistema actual de login es temporal. Se implementará autenticación real en futuras versiones.

## Desafíos y Soluciones

### Dark Mode
- **Desafío:** Mantener consistencia visual en toda la aplicación
- **Solución:** Sistema centralizado de CSS variables y configuración Tailwind con soporte para `darkMode: 'class'`

### Componentes Reutilizables
- **Desafío:** Evitar duplicación de código entre diferentes vistas
- **Solución:** Componentes genéricos (Button, Input, Table, etc.) con props configurables

### Gestión de Estado
- **Desafío:** Sincronizar datos entre componentes
- **Solución:** Custom hooks (usePatients, useCaregivers, etc.) que centralizan la lógica

## Objetivos del proyecto
- Centralizar todo en un unico sitema 
- Digitalizar informes y horas trabajadas
- Automatizar procesos de pago
- Mejorar la comunicacion entre acompañantes, familias , paciente y administradores  

## Video del proyecto

[![Video de presentación de CareConnect](https://img.youtube.com/vi/58vVAb8x57A/0.jpg)](https://youtu.be/58vVAb8x57A "Presiona para ver el video completo")

**[Ver en YouTube](https://youtu.be/58vVAb8x57A)**

## Equipo S02-26-E19

| Nombre | Rol | LinkedIn | Github |
|---|---|---|---|
| Ezequiel Oliver | Desarrollador Frontend | [LinkedIn](https://www.linkedin.com/in/ezequiel-oliver/) | [Github](https://github.com/Oliver-92) |
| Judith Diaz | Desarrollador Backend | [LinkedIn](https://www.linkedin.com/in/judithcarolinadiaz/) | [Github](https://github.com/Judith-Diaz) |
| Fei Mosqueda | Desarrollador Frontend | [LinkedIn](https://www.linkedin.com/in/fei-mosqueda-934036260) | [Github](https://github.com/feimb) |
| Yoshua Pariona | Desarrollador Backend | [LinkedIn](https://www.linkedin.com/in/logan-yoshua-pariona/) | [Github](https://github.com/YoshuaPariona) |
| Nombre | Rol | [LinkedIn]() | [Github]() |
