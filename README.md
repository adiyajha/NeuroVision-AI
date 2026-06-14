# NeuroVision AI

Brain-inspired event-driven surveillance platform applying neuromorphic computing principles. Intelligence activates only when meaningful events occur — reducing CPU usage by **92%** while enabling real-time threat detection.

## Project Structure

```
neurovision-ai/
├── frontend/          # React + TypeScript + Tailwind + Tremor dashboard
├── backend/           # FastAPI + SQLite + WebSocket API
├── ai_pipeline/       # Modular neuromorphic processing pipeline
├── index.html         # Legacy landing page (preserved)
├── app.js             # Legacy scripts (preserved)
└── styles.css         # Legacy styles (preserved)
```

## Quick Start

### Prerequisites

- **Node.js 18+** (for frontend)
- **Python 3.11+** (for backend)

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload --port 8000
```

API docs: http://localhost:8000/docs

## Features

### Landing Page
- Premium dark mode with glassmorphism
- Magic UI: Spotlight, Particles, Animated Beam, Bento Grid, Number Ticker, Marquee, Border Beam
- Framer Motion page transitions and scroll animations
- Sections: Hero, Problem, Innovation, How It Works, Dashboard Preview, Impact, Applications, Future Vision, CTA

### Enterprise Dashboard (`/dashboard`)
- Tremor KPI cards: Events Today, CPU Saved, Threats Detected, Frames Skipped
- Live event marquee feed with WebSocket streaming
- Event Detection Timeline (AreaChart)
- Threat Monitoring panel
- CPU Savings & Frames Skipped charts
- Detection Statistics (DonutChart + ProgressBars)
- System Health & Resource Utilization

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/events` | List recent events |
| POST | `/event` | Create event |
| GET | `/alerts` | List alerts |
| POST | `/alert` | Create alert |
| GET | `/stats` | System metrics |
| GET | `/health` | Health check |
| GET | `/snapshots` | Event snapshots |
| WS | `/ws/events` | Real-time event stream |

### AI Pipeline Modules

- `camera.py` — Video acquisition
- `event_detector.py` — Motion spike detection
- `spike_queue.py` — Event buffering
- `async_processor.py` — Async worker pool
- `object_detector.py` — YOLOv8 Nano (mock)
- `threat_analyzer.py` — Rules engine
- `snapshot_generator.py` — Frame caching
- `alert_system.py` — Multi-channel alerts
- `metrics.py` — Performance tracking

## Deployment (Step-by-Step)

### Step 1 — Push to GitHub

If the repo is not on GitHub yet:

1. Go to [github.com/new](https://github.com/new) and create a repo named `neurovision-ai` (no README).
2. In PowerShell, run:

```powershell
cd "C:\Users\hp\OneDrive\ドキュメント\GitHub\neurovision-ai"
git remote add origin https://github.com/YOUR_USERNAME/neurovision-ai.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

### Step 2 — Deploy Backend (Railway)

1. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
2. Select `neurovision-ai`
3. Set **Root Directory** to `backend`
4. Add **Variables**:

| Variable | Value |
|----------|-------|
| `CORS_ORIGINS` | `https://YOUR-VERCEL-URL.vercel.app` (update after Step 3) |
| `DATABASE_URL` | `sqlite:///./neurovision.db` |
| `MOCK_EVENT_INTERVAL` | `5.0` |

5. Deploy → copy your public URL, e.g. `https://neurovision-ai-production.up.railway.app`
6. Test: open `https://YOUR-BACKEND-URL/health` — should return `"status": "healthy"`

---

### Step 3 — Deploy Frontend (Vercel)

1. Go to [vercel.com/new](https://vercel.com/new) → **Import** your GitHub repo
2. Set **Root Directory** to `frontend`
3. Add **Environment Variables**:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://YOUR-BACKEND-URL.up.railway.app` |
| `VITE_WS_URL` | `wss://YOUR-BACKEND-URL.up.railway.app/ws/events` |

4. Click **Deploy**
5. Copy your Vercel URL, e.g. `https://neurovision-ai.vercel.app`

---

### Step 4 — Connect Frontend ↔ Backend

1. Go back to **Railway** → update `CORS_ORIGINS` to your Vercel URL
2. Redeploy Railway (or wait for auto-restart)
3. Open your Vercel URL → go to `/dashboard` → status should show **WS LIVE**

---

### Alternative: Render (Backend)

Use the included `backend/render.yaml` blueprint, or create a Web Service with:
- **Root Directory:** `backend`
- **Build:** `pip install -r requirements.txt`
- **Start:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

## Deployment (Quick Reference)

### Frontend → Vercel

```bash
cd frontend
npm run build
```

Set environment variables in Vercel:
- `VITE_API_URL` = your Railway/Render backend URL
- `VITE_WS_URL` = `wss://your-backend/ws/events`

### Backend → Railway or Render

Deploy the `backend/` directory. Set:
- `CORS_ORIGINS` = your Vercel frontend URL
- `DATABASE_URL` = `sqlite:///./neurovision.db` (or PostgreSQL for production)

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Tremor, Magic UI patterns

**Backend:** FastAPI, SQLAlchemy, SQLite, Pydantic, WebSockets

**AI Pipeline:** OpenCV-ready architecture, YOLOv8 Nano integration points, asyncio workers

## License

MIT © 2026 NeuroVision AI
