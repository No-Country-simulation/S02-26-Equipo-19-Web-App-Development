# CareConnect — Backend

CareConnect es una plataforma web unificada para la gestión de atención domiciliaria de pacientes. Centraliza la coordinación entre cuidadores, pacientes, familias y administradores en un solo sistema, reemplazando procesos manuales y herramientas desconectadas.

 # Tecnologías
  *Java 21
  *Spring Boot 3
  *PostgreSQL 16
  *Flyway (migraciones)
  *Docker
  
 # Requisitos
 *Java 21
 * Docker Desktop
 * Node.js +18

# Estructura del proyecto
 ├── backend/
│   └── src/main/java/com/team19/CareConnect/
│       ├── core/         # Usuarios, autenticación, roles, pacientes
│       ├── onboarding/   # Solicitudes y formularios de cuidadores
│       ├── patientreport/# Reportes de atención
│       ├── billing/      # Pagos y facturación
│       └── config/       # Configuración CORS y seguridad
├── frontend/CareConnect/
├── docker-compose.yml
└── README.md

1. **Clonar el repositorio**:
 
   git clone https://github.com/No-Country-simulation/S02-26-Equipo-19-Web-App-Development.git
   cd S02-26-Equipo-19-Web-App-Development/backend
   
2. **Configurar variables de entorno:**:

   DB_USER=care_user
   DB_PASSWORD=care_password
   DB_NAME=care_connect_db
 
3. **Levantar la base de datos**:
   
   docker compose up -d

4. **Levantar el backend**:
   
   Correr el backend desde IntelliJ darle Run  o
  
   -bash-
   cd backend
   ./mvnw spring-boot:run
   
   El servidor iniciará en `http://localhost:8080`.
   
5. **Levantar el frontend**:
 -bash-
 cd frontend/CareConnect
 npm install
 npm run dev
