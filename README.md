# Full Stack Project – Dockerized Setup

This repo is configured to run fully isolated in Docker: frontend (Vite + React), backend (Express + TypeScript), and MongoDB.

## Services

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- MongoDB: mongodb://localhost:27017 (container name `mongo`)

## Quick start (Windows PowerShell)

```powershell
# From the repo root
npm run dev:docker
```

Once the build finishes:

- Open the frontend at http://localhost:5173
- API health: http://localhost:4000/health
- API ping: http://localhost:4000/api/ping

To stop:

```powershell
npm run down
```

## Notes

- The frontend dev server proxies `/api/*` to the backend inside Docker, so the app can call `/api/ping` directly.
- Environment variables:
  - Backend: `MONGODB_URI` defaults to `mongodb://mongo:27017/ecom` in Docker.
  - Frontend: `VITE_API_BASE` is set to `http://localhost:4000` but the app uses `/api` with proxy by default.
- For local (non-Docker) development, you can run:

```powershell
npm run dev:frontend
# In another terminal
npm run dev:backend
```

You’ll also need a local MongoDB running at `mongodb://localhost:27017` or adjust `MONGODB_URI` accordingly.
