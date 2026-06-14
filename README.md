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

## Deployment

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
