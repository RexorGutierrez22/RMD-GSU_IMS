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
<<<<<<< HEAD
cd RMD-GSU_IMS
```

### 2. ▶️ Run the full system with Docker
=======
cd rmd-inventory-docker-test
```

---

### 2. ⚛️ Create the React Frontend (First-Time Only)

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

If the frontend already exists in this repo, just run:

```bash
cd frontend
npm install
```

---

### 3. ▶️ Run the full system with Docker
>>>>>>> 31bbe42fa3256a18e3552be11a90342810708882

```bash
docker-compose up --build
```

This starts:
- Laravel backend: [http://localhost:8000](http://localhost:8000)
<<<<<<< HEAD
- React frontend: [http://localhost:3000](http://localhost:3000)
- MySQL database: localhost:3306

### 3. 🔑 Generate Laravel App Key (First time only)

```bash
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate
```
=======
- React frontend: [http://localhost:5173](http://localhost:5173)
>>>>>>> 31bbe42fa3256a18e3552be11a90342810708882

---

## 📦 Folder Structure

```
<<<<<<< HEAD
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
=======
rmd-inventory-docker-test/
├── rmd-inventory-backend/     # Laravel API
│   └── Dockerfile
├── frontend/                  # React (Vite)
│   └── Dockerfile
├── docker-compose.yml
├── README.md
>>>>>>> 31bbe42fa3256a18e3552be11a90342810708882
```

---

<<<<<<< HEAD
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
=======
## ⚙️ Laravel Environment Configuration

In `rmd-inventory-backend/.env`, make sure these are set:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
>>>>>>> 31bbe42fa3256a18e3552be11a90342810708882
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

<<<<<<< HEAD
### CORS Configuration (config/cors.php)
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:3000'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
=======
Also update `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
>>>>>>> 31bbe42fa3256a18e3552be11a90342810708882
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
