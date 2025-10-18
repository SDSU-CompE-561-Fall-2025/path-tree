# Course Planner API

FastAPI backend for a student degree planning tool. It exposes endpoints to manage programs, streams, degree plans, terms, and planned courses. The current implementation ships with **stub/in-memory repositories** so you can demo the API without a database. You can later switch the repositories to PostgreSQL without changing the HTTP routes.

---

## Features

- Auth stubs: `/auth/register`, `/auth/login`, `/auth/refresh`
- Profile stub: `/students/me`
- Catalog: `/programs`, `/programs/{id}`, `/programs/{id}/streams`, `/programs/{id}/requirements`
- Planner: `/plans`, `/plans/{id}`, `/plans/{id}/terms`, `/plans/{id}/terms/{termId}/courses`
- Audit + Collaboration stubs: `/plans/{id}/audit`, `/plans/{id}/share-links`
- OpenAPI (Swagger) docs with examples for each request

---

## Tech stack

- **Python** 3.11+  
- **FastAPI** + Uvicorn  
- Layered project structure (routes → services → repository → models)  
- PostgreSQL 

---

## Project layout

```
src/
└─ app/
   ├─ main.py                # FastAPI app entry; custom OpenAPI (servers, security labels)
   ├─ api/
   │  └─ v1/
   │     └─ routes.py        # All v1 routers mounted here
   ├─ core/
   │  ├─ settings.py         # Env/config
   │  ├─ database.py         # SQLAlchemy Base (DB wiring later)
   │  └─ dependencies.py     # Shared FastAPI deps
   ├─ models/                # SQLAlchemy models (add as you migrate to Postgres)
   │  └─ program.py
   ├─ repository/            # Data access (currently in-memory; swap to DB later)
   │  ├─ program.py
   │  └─ plan.py
   ├─ services/              # Business logic (thin orchestration)
   │  ├─ program.py
   │  └─ plan.py
   ├─ routes/                # HTTP layer (FastAPI routers)
   │  ├─ status.py
   │  ├─ auth.py
   │  ├─ programs.py
   │  └─ plans.py
   └─ schemas/               # Pydantic schemas shared at the HTTP layer
      ├─ token.py
      └─ __init__.py
```

---

## Getting started

### 1) Create & activate a virtualenv
```bash
python -m venv .venv
# Windows
. .venv/Scripts/activate
# macOS/Linux
source .venv/bin/activate
```

### 2) Install dependencies
If you have a `requirements.txt`, do:
```bash
pip install -r requirements.txt
```
If not, install the basics:
```bash
pip install fastapi uvicorn[standard] pydantic-settings
```

### 3) Run the API
```bash
uvicorn app.main:app --reload --app-dir src
```

Open the docs: <http://localhost:8000/docs>  
OpenAPI JSON: <http://localhost:8000/openapi.json>

---



## License

Personal/academic use
