# CourseCompass — Academic Course Planner

A full-stack web application that helps students plan their entire academic journey — track completed courses, build multi-term degree plans, and run real-time degree audits against their program requirements.

Built with a **FastAPI** backend and a **Next.js 16** frontend, containerized with Docker Compose for one-command local development.

**Live:** [path-tree-five.vercel.app](https://path-tree-five.vercel.app)

---

## Features

- **Secure Authentication** — JWT access tokens stored in HttpOnly cookies (never exposed to JavaScript), with automatic refresh token rotation
- **Course Completion Tracker** — Log completed, in-progress, and planned courses with grades, term codes, and unit counts
- **Academic Plan Builder** — Create named degree plans, organize courses by term, add or remove courses from each semester
- **Live Degree Audit** — Evaluate plan progress against official program requirements, see exactly which requirements are satisfied and which are missing
- **GPA & Unit Snapshot** — Real-time GPA calculation and unit progress visualized with SVG donut charts
- **Shareable Audit Links** — Generate a shareable URL to a specific plan's audit view
- **Program of Study View** — Collapsible requirement tree with expand/collapse controls, color-coded completion status

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | FastAPI (async) |
| ORM | SQLAlchemy 2.0 (async + `asyncpg`) |
| Database | PostgreSQL |
| Validation | Pydantic v2 |
| Auth | JWT via `python-jose`, Argon2 password hashing via `pwdlib` |
| Migrations | Alembic |
| Runtime | Uvicorn |

### Frontend
| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS v4, shadcn/ui, Radix UI |
| Icons | Lucide React |
| Theme | next-themes (dark mode support) |
| Runtime | React 19 |

### Infrastructure
- Docker + Docker Compose (Postgres + backend + frontend in one command)
- **Render** — backend API + PostgreSQL (production)
- **Vercel** — frontend (production)
- Next.js API proxy — all browser requests go through `/api/proxy/*` on Vercel, which forwards to Render server-side, keeping auth cookies same-origin

---

## Architecture

```
                    Browser
                       │
                       ▼
        ┌──────────────────────────┐
        │   Next.js (Vercel)       │
        │   path-tree-five.vercel  │
        │                          │
        │  /app pages              │
        │  /api/proxy/[...path] ───┼──── server-side fetch ────►  FastAPI (Render)
        │                          │                               path-tree.onrender.com
        │  Cookie lives here ◄─────┼──── Set-Cookie forwarded ────
        └──────────────────────────┘
                                                                        │ asyncpg
                                                                        ▼
                                                               PostgreSQL (Render)
```

The backend uses **repository pattern** — routes depend on repository classes, not raw DB sessions. Every request goes through an async SQLAlchemy session, keeping DB I/O non-blocking throughout.

**Auth flow:** Login sets an `HttpOnly` cookie via a Next.js API proxy route. The browser never talks to Render directly — all requests go through `/api/proxy/*` on Vercel, which forwards them server-side. This keeps the auth cookie same-origin (Vercel domain), bypassing cross-origin cookie restrictions entirely. If a request returns 401, the frontend automatically attempts a refresh token rotation before retrying.

---

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)
- Or: Python 3.11+ and Node.js 18+ for local runs

### 1. Clone & configure

```bash
git clone <repo-url>
cd path-tree
cp .env.example .env   # fill in your secrets
```

Minimum required values in `.env`:

```env
SECRET_KEY=your-secure-random-key
REFRESH_SECRET_KEY=your-secure-random-refresh-key
POSTGRES_PASSWORD=yourpassword
```

### 2. Run with Docker

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| Swagger docs | http://localhost:8000/docs |

The backend automatically runs migrations and seeds the database with programs, courses, and terms on first startup — no manual setup needed.

### 3. Run without Docker

**Backend:**
```bash
cd backend
pip install -e ".[dev]"
uvicorn src.app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Create account |
| `POST` | `/api/v1/auth/login-json` | Login, sets HttpOnly cookie |
| `POST` | `/api/v1/auth/refresh` | Rotate refresh token |
| `GET` | `/api/v1/auth/me` | Get current user |
| `GET` | `/api/v1/plans` | List user's plans |
| `POST` | `/api/v1/plans` | Create a plan |
| `GET` | `/api/v1/plans/{id}/audit` | Run degree audit |
| `GET` | `/api/v1/completions` | List course completions |
| `GET` | `/api/v1/programs` | List programs |
| `GET` | `/api/v1/courses` | Search course catalog |

Full interactive docs at `/docs` (Swagger UI) or `/redoc`.

---

## Deployment

The app is live at **[path-tree-five.vercel.app](https://path-tree-five.vercel.app)**

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://path-tree-five.vercel.app |
| Backend API | Render | https://path-tree.onrender.com |
| Database | Render PostgreSQL | internal to Render network |

### Deploying your own instance

#### 1. Backend on Render

Create a **Web Service** pointing to the `/backend` directory with **Docker** runtime.

Set these environment variables:

```
DATABASE_URL        = postgresql+asyncpg://<render-db-url>
SECRET_KEY          = <random hex string>
REFRESH_SECRET_KEY  = <different random hex string>
ENVIRONMENT         = production
CORS_ORIGINS        = https://your-app.vercel.app
ALGORITHM           = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS   = 30
```

Generate secrets with:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

#### 2. Frontend on Vercel

Import the repo, set **Root Directory** to `frontend`, and add:

```
NEXT_PUBLIC_API_BASE_URL = https://your-render-backend.onrender.com
```

> **Note:** The frontend proxies all API calls through `/api/proxy/*` (a Next.js Route Handler) to the backend. This keeps auth cookies same-origin and avoids all cross-origin browser restrictions. You do not need to configure CORS for the frontend — only `CORS_ORIGINS` on the backend matters.

> **Note:** Render free tier spins down after inactivity. First request after sleep takes ~30s. Consider upgrading or using an uptime monitoring service to keep it warm.

---

## Project Structure

```
backend/
  src/app/
    api/v1/router.py       # Route registration
    routes/                # HTTP handlers
    repository/            # DB access layer
    services/              # Business logic
    schemas/               # Pydantic I/O models
    models/                # SQLAlchemy ORM models
    core/                  # Auth, DB, settings, dependencies
    seed.py                # Initial data seeding

frontend/
  src/
    app/                   # Next.js App Router pages
      api/proxy/[...path]/ # Server-side proxy to Render backend
      (auth)/              # Login & register
      profile/             # Plan management
      classes/             # Course completion manager
      program-of-study/    # Degree audit view
    components/            # Shared UI components
    lib/                   # API client, auth helpers
    types/                 # TypeScript type definitions
```

---

## License

Personal / Academic use
