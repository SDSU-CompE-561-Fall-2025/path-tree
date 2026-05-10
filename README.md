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

This is the **recommended way** to run the full stack locally.

### 1️⃣ Install Docker

- **macOS/Windows**: Download [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: Install Docker and Docker Compose via package manager:
  ```bash
  sudo apt-get install docker.io docker-compose  # Ubuntu/Debian
  sudo yum install docker docker-compose         # RHEL/CentOS
  ```

### 2️⃣ Configure Environment Variables

Copy `.env.example` to `.env` in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Security (IMPORTANT: Change these in production!)
SECRET_KEY=your-secure-random-key-here
REFRESH_SECRET_KEY=your-secure-random-refresh-key-here

# Database
POSTGRES_PASSWORD=your-secure-db-password
POSTGRES_USER=course_planner
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=course_planner

# Database URL (auto-generated from above for reference)
DATABASE_URL=postgresql+asyncpg://course_planner:your-secure-db-password@localhost:5432/course_planner

# Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

**⚠️ Security Note**: Never commit `.env` to version control. Use `.env.example` for templates.

### 3️⃣ Run the Full Stack

From the **project root**:

```bash
docker compose build
docker compose up
```

This starts:
- **Postgres** container on port 5432
- **FastAPI backend** on `http://localhost:8000`
- **Next.js frontend** on `http://localhost:3000`

To run in background:
```bash
docker compose up -d
```

To view logs:
```bash
docker compose logs -f backend  # Backend logs
docker compose logs -f frontend # Frontend logs
docker compose logs -f db       # Database logs
```

To stop:
```bash
docker compose down
```

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

## 🐛 Troubleshooting

### Port Already in Use
If ports 5432, 8000, or 3000 are already in use:

```bash
# Find what's using the port (macOS/Linux)
lsof -i :8000  # For port 8000

# Or change ports in docker-compose.yml
# Example: "8001:8000" maps container port 8000 to host port 8001
```

### Environment Variables Not Loading
- Ensure `.env` is in the project root (same level as `docker-compose.yml`)
- Restart containers after changing `.env`:
  ```bash
  docker compose down
  docker compose up --build
  ```

### Database Connection Failed
- Check Postgres container is healthy: `docker compose ps`
- Verify POSTGRES_PASSWORD matches between `.env` and docker-compose.yml
- View database logs: `docker compose logs db`

### Frontend Can't Connect to Backend
- Ensure backend is running: `docker compose logs backend`
- Check NEXT_PUBLIC_API_BASE_URL in `.env` matches backend URL
- Verify CORS settings in backend/src/app/main.py

### TypeScript Errors in Frontend
- Clear Next.js cache: `rm -rf frontend/.next`
- Reinstall dependencies: `cd frontend && npm install`
- Check node_modules are up to date

### Backend Won't Start
- Check Python version: `docker compose logs backend`
- Verify all environment variables are set in `.env`
- Ensure requirements.txt is properly formatted

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
