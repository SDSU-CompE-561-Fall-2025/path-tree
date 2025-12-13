# Course Planner – Backend + Frontend (Docker Ready)

This project contains a **FastAPI backend** and a **Next.js frontend** for a complete Course Planner system.  
The project now supports **Docker Compose**, automatic **database migrations**, and **data seeding** (courses, programs, terms).

---

## 🚀 Project Overview

### **Backend (FastAPI)**
- Authentication (cookie-based)
- Programs, Courses, Plans, Terms
- Automatic seeding of:
  - COMPE courses
  - General education courses (CS, MATH, PHYS, ENG, CHEM, BIO)
  - COMPE program
- PostgreSQL database
- Dockerized using Uvicorn + Python 3.11

### **Frontend (Next.js 16)**
- Full Course Planner UI
- Classes manager (add/remove completions)
- Program of Study audit
- Academic plans
- Cookie-based auth
- Dockerized for production

---

## 📁 Project Structure

```
backend/
  src/app/
    main.py
    models/
    routes/
    repository/
    services/
    core/
    seed.py
frontend/
  src/app/
  src/components/
  src/lib/
```  

---

## 🐳 Running Everything With Docker

This is now the **only recommended way** to run the full stack locally.

### 1️⃣ Install Docker
Download Docker Desktop for macOS:  
https://www.docker.com/products/docker-desktop/

### 2️⃣ Ensure your backend `.env` values are correct
`backend/.env` should contain **local Postgres credentials** for Docker Compose:

```
DATABASE_URL=postgresql+asyncpg://postgres:1234@db:5432/course_planner
SECRET_KEY=supersecret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3️⃣ Run everything
From the **project root (`path-tree/`)**:

```
docker compose build
docker compose up
```

This starts:
- **Postgres** container
- **FastAPI backend** (`http://localhost:8000`)
- **Next.js frontend** (`http://localhost:3000`)

---

## 🛢 Database & Seeding

The backend automatically seeds:
- Global terms (FA24, SP25, SU25, FA25, SP26)
- COMPE program
- COMPE courses
- General CS/MATH/PHYS/ENG/CHEM/BIO courses

### To inspect DB manually:

```
docker compose exec db psql -U postgres -d course_planner
```

List tables:
```
\dt
```

View data:
```
SELECT * FROM courses;
SELECT * FROM terms;
SELECT * FROM programs;
```

---

## 🧪 Running Backend Locally (without Docker)
If you need to run FastAPI manually:

```
cd backend
pip install -r requirements.txt
python3 -m uvicorn src.app.main:app --reload
```

Open Swagger:  
http://localhost:8000/docs

---

## 🧪 Running Frontend Locally (without Docker)

```
cd frontend
npm install
npm run dev
```

Open:  
http://localhost:3000

---

## ❗ Notes
- Docker is required for consistent Postgres + backend startup.
- No manual DB inserts are required; all seed data is generated automatically.
- When schema changes, reset docker DB volume:

```
docker compose down
docker volume rm path-tree_db_data
```



## License
Personal / Academic use
