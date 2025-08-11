# 🧪 RMD Inventory System (Docker Test Version)

This is a **Dockerized test setup** for the Resource Management Division Inventory System. It includes:

- Laravel API backend (`rmd-inventory-backend/`)
- React Vite frontend (`rmd-inventory-frontend/`)
- MySQL database
- Docker-based development environment

---

## 🚀 Quick Start Guide

### 1. 📥 Clone this repository

```bash
git clone https://github.com/RexorGutierrez22/RMD-GSU_IMS.git
cd RMD-GSU_IMS
```

### 2. ▶️ Run the full system with Docker

```bash
docker-compose up --build
```

This starts:
- Laravel backend: [http://localhost:8000](http://localhost:8000)
- React frontend: [http://localhost:3000](http://localhost:3000)
- MySQL database: localhost:3306

### 3. 🔑 Generate Laravel App Key (First time only)

```bash
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate
```

---

## 📦 Folder Structure

```
RMD-GSU_IMS/
├── rmd-inventory-backend/     # Laravel API
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── Dockerfile
├── rmd-inventory-frontend/    # React (Vite)
│   ├── src/
│   ├── public/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Environment Configuration

### Backend Configuration (.env)
```env
APP_NAME=Laravel
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=rmd_inventory
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

### CORS Configuration (config/cors.php)
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

---

<<<<<<< HEAD
## � Development Notes

- Make sure Docker Desktop is running before starting the system
- All services run in isolated containers:
  - Backend: PHP 8.2 with Laravel
  - Frontend: Node.js with React + Vite
  - Database: MySQL 8.0
- No need to install PHP, Node.js, or MySQL locally
- API endpoints are accessible at `http://localhost:8000/api`
- Frontend dev server runs at `http://localhost:3000`

### Available API Endpoints

- POST `/api/login` - User authentication
- POST `/api/logout` - User logout (requires auth)
- POST `/api/employees` - Create employee

---

## ⚠️ Important Reminders

- This is a test repository for Docker implementation
- Always check Docker logs if services aren't responding
- Use `docker-compose down` to stop all services
- Use `docker-compose up -d` for detached mode

PLEASE READ AND FOLLOW THIS GUIDE CAREFULLY!
=======
## 🛠 Notes

- This is a test repo only. You can merge the Docker setup into the main project once verified.
- Make sure Docker Desktop is installed before running the system.
- You don’t need to install PHP, Node, MySQL manually.

---

PLEASE FOLLOW AND READ LANG NINYO NI GOIS !


>>>>>>> 31bbe42fa3256a18e3552be11a90342810708882
