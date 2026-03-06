# CareConnect — Backend https://no-country-care-connect.netlify.app/

CareConnect es una plataforma web unificada para la gestión de atención domiciliaria de pacientes. Centraliza la coordinación entre cuidadores, pacientes, familias y administradores en un solo sistema, reemplazando procesos manuales y herramientas desconectadas.
---
 # Tecnologías
  * Java 21
  * Spring Boot 3
  * PostgreSQL 16
  * Flyway (migraciones)
  * Docker
  ---
 # Requisitos
 * Java 21
 * Docker Desktop
 * Node.js +18

 * ---
##  Roles

| Rol | Descripción |
|-----|-------------|
| **Administrador** | Gestiona usuarios, aprueba/rechaza reportes y administra la plataforma |
| **Cuidador** | Carga reportes de atención y registra horas trabajadas |
| **Familiar** | Visualiza los reportes aprobados de su paciente y recibe facturas |
| **Paciente** | Sujeto de los registros de atención |

---

# Estructura del proyecto
| Carpeta | Descripción |
|---------|-------------|
| `backend/core` | Usuarios, autenticación, roles, pacientes |
| `backend/onboarding` | Solicitudes y formularios de cuidadores |
| `backend/patientreport` | Reportes de atención |
| `backend/billing` | Pagos y facturación |
| `backend/config` | Configuración CORS y seguridad |
| `frontend/CareConnect` | Interfaz de usuario |
---
1. **Clonar el repositorio**:
 
```bash
git clone https://github.com/No-Country-simulation/S02-26-Equipo-19-Web-App-Development.git
cd S02-26-Equipo-19-Web-App-Development
```
   
2. **Configurar variables de entorno:**:
```env
  DB_USER=care_user
  DB_PASSWORD=care_password
  DB_NAME=care_connect_db
 ```
3. **Levantar la base de datos**:
   
```bash
docker compose up -d
```

4. **Levantar el backend**:
   
Desde IntelliJ darle Run a `CareConnectApplication`, o desde la terminal:
```bash
cd backend
./mvnw spring-boot:run
```
   
   El servidor iniciará en `http://localhost:8080`.
   
5. **Levantar el frontend**:
```bash
cd frontend/CareConnect
npm install
npm run dev
```

    Disponible en  http://localhost:5173

  ##  Desplegado en   https://no-country-care-connect.netlify.app/


  Arquitectura:

Es una app full stack con frontend y backend separados
El frontend en React se comunica con el backend en Spring Boot a través de una API REST
El backend usa PostgreSQL como base de datos y Flyway para manejar los cambios de esquema con migraciones versionadas
Todo corre en Docker localmente y está desplegado en Koyeb y Netlify

Estructura del backend:

Está organizado por módulos (core, onboarding, patientreport, billing) cada uno con su propia responsabilidad
Sigue el patrón Controller → Service → Repository para separar las capas

Seguridad:

Tiene autenticación con roles, cada usuario solo puede ver y hacer lo que le corresponde según su rol

Base de datos:

Las migraciones de Flyway garantizan que todos los entornos (local, producción) tengan siempre el mismo esquema
