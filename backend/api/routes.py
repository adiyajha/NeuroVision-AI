from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from database.connection import get_db
from models.schemas import EventCreate, EventResponse, AlertCreate, AlertResponse, StatsResponse, HealthResponse, SnapshotResponse
from services.event_service import create_event, get_events, create_alert, get_alerts, get_stats
from services.websocket_manager import register, unregister, broadcast, connection_count, get_uptime
from utils.helpers import utc_now, generate_id

router = APIRouter()


@router.get("/events", response_model=list[EventResponse])
def list_events(db: Session = Depends(get_db)):
    return get_events(db)


@router.post("/event", response_model=EventResponse)
async def post_event(data: EventCreate, db: Session = Depends(get_db)):
    event = create_event(db, data)
    await broadcast({"type": "event", "data": event.model_dump(mode="json")})
    return event


@router.get("/alerts", response_model=list[AlertResponse])
def list_alerts(db: Session = Depends(get_db)):
    return get_alerts(db)


@router.post("/alert", response_model=AlertResponse)
async def post_alert(data: AlertCreate, db: Session = Depends(get_db)):
    alert = create_alert(db, data)
    await broadcast({"type": "alert", "data": alert.model_dump(mode="json")})
    return alert


@router.get("/stats", response_model=StatsResponse)
def stats(db: Session = Depends(get_db)):
    return get_stats(db)


@router.get("/health", response_model=HealthResponse)
def health(db: Session = Depends(get_db)):
    events = get_events(db, limit=1)
    return HealthResponse(
        status="healthy",
        uptime_seconds=get_uptime(),
        pipeline_active=True,
        websocket_connections=connection_count(),
        last_event_at=events[0].timestamp if events else None,
    )


@router.get("/snapshots", response_model=list[SnapshotResponse])
def snapshots(db: Session = Depends(get_db)):
    events = get_events(db, limit=10)
    return [
        SnapshotResponse(
            id=e.id,
            timestamp=e.timestamp,
            camera_id=e.camera_id,
            event_type=e.event_type,
            thumbnail_url=f"/api/snapshots/{e.id}.jpg",
        )
        for e in events
    ]


@router.websocket("/ws/events")
async def websocket_events(websocket: WebSocket):
    await websocket.accept()
    await register(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await unregister(websocket)
