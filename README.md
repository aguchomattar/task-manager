📝 Task Manager Application
Aplicación full-stack de gestión de tareas construida con React, Node.js y PostgreSQL.
🏗️ Arquitectura

Frontend: React 18 + CSS moderno
Backend: Node.js + Express
Base de Datos: PostgreSQL 15

🚀 Quick Start
Desarrollo Local con Docker Compose
bash# Clonar el repositorio
git clone https://github.com/tu-usuario/taskmanager-app.git
cd taskmanager-app

# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
Acceder a:

Frontend: http://localhost:3000
Backend API: http://localhost:5000/api/tasks
Health Check: http://localhost:5000/health

Desarrollo Local sin Docker
Backend
bashcd backend
npm install
npm start
Frontend
bashcd frontend
npm install
npm start
🐳 Construcción de Imágenes Docker
bash# Backend
docker build -t tu-usuario/taskmanager-backend:v1 ./backend

# Frontend
docker build -t tu-usuario/taskmanager-frontend:v1 ./frontend

# Push a Docker Hub
docker push tu-usuario/taskmanager-backend:v1
docker push tu-usuario/taskmanager-frontend:v1
📦 Imágenes Disponibles

Backend: tu-usuario/taskmanager-backend:v1
Frontend: tu-usuario/taskmanager-frontend:v1

🔧 Variables de Entorno
Backend
VariableDescripciónDefaultDB_HOSTHost de PostgreSQLlocalhostDB_PORTPuerto de PostgreSQL5432DB_NAMENombre de la base de datostaskdbDB_USERUsuario de PostgreSQLpostgresDB_PASSWORDContraseña de PostgreSQLpostgresPORTPuerto del servidor5000
Frontend
VariableDescripciónDefaultREACT_APP_API_URLURL del backendhttp://localhost:5000
📡 API Endpoints
Tasks

GET /api/tasks - Obtener todas las tareas
POST /api/tasks - Crear nueva tarea
PUT /api/tasks/:id - Actualizar tarea
DELETE /api/tasks/:id - Eliminar tarea

Health

GET /health - Estado del servidor

🧪 Testing
bash# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test 