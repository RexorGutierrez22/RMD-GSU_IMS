# 🧪 RMD Inventory System (Docker Test Version)

This is a **Dockerized test setup** for the Resource Management Division Inventory System. It includes:

- Laravel API backend (`rmd-inventory-backend/`)
- React Vite frontend (`frontend/`)
- MySQL database
- Docker-based development environment

---

## 🚀 Quick Start Guide

### 1. 📥 Clone this repository

```bash
git clone https://github.com/YOUR_USERNAME/rmd-inventory-docker-test.git
cd rmd-inventory-docker-test
```

> Replace `YOUR_USERNAME` with your GitHub username.

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

```bash
docker-compose up --build
```

This starts:
- Laravel backend: [http://localhost:8000](http://localhost:8000)
- React frontend: [http://localhost:5173](http://localhost:5173)

---

## 📦 Folder Structure

```
rmd-inventory-docker-test/
├── rmd-inventory-backend/     # Laravel API
│   └── Dockerfile
├── frontend/                  # React (Vite)
│   └── Dockerfile
├── docker-compose.yml
├── README.md
```

---

## ⚙️ Laravel Environment Configuration

In `rmd-inventory-backend/.env`, make sure these are set:

```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=laravel
```

Also update `config/cors.php`:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
```

---

## 🛠 Notes

- This is a test repo only. You can merge the Docker setup into the main project once verified.
- Make sure Docker Desktop is installed before running the system.
- You don’t need to install PHP, Node, MySQL manually.

---

PLEASE FOLLOW AND READ LANG NINYO NI GOIS !


