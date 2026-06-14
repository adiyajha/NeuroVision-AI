import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import init_db, SessionLocal
from api.routes import router
from services.event_service import seed_mock_data
from services.websocket_manager import mock_event_generator
from utils.config import get_settings

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    db = SessionLocal()
    try:
        seed_mock_data(db)
    finally:
        db.close()
    task = asyncio.create_task(mock_event_generator(settings.mock_event_interval))
    yield
    task.cancel()


app = FastAPI(
    title=settings.app_name,
    description="Event-driven neuromorphic surveillance API",
    version="1.0.0",
    lifespan=lifespan,
)

origins = [o.strip() for o in settings.cors_origins.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def root():
    return {"service": settings.app_name, "status": "operational", "docs": "/docs"}
