# CareConnect — Backend

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
