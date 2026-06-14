import asyncio
import time
from typing import Set
from fastapi import WebSocket
from sqlalchemy.orm import Session
from database.connection import SessionLocal
from services.event_service import create_event, generate_mock_event, create_alert
from models.schemas import AlertCreate

_start_time = time.time()
_connections: Set[WebSocket] = set()


def get_uptime() -> float:
    return time.time() - _start_time


async def broadcast(message: dict):
    dead = set()
    for ws in _connections:
        try:
            await ws.send_json(message)
        except Exception:
            dead.add(ws)
    _connections -= dead


async def register(ws: WebSocket):
    _connections.add(ws)


async def unregister(ws: WebSocket):
    _connections.discard(ws)


def connection_count() -> int:
    return len(_connections)


async def mock_event_generator(interval: float = 5.0):
    while True:
        await asyncio.sleep(interval)
        if not _connections:
            continue
        db: Session = SessionLocal()
        try:
            event_data = generate_mock_event()
            event = create_event(db, event_data)
            await broadcast({"type": "event", "data": event.model_dump(mode="json")})

            if event.confidence > 85 and event.status == "threat":
                alert = create_alert(db, AlertCreate(
                    severity="high" if event.confidence > 90 else "medium",
                    message=event.event_type,
                    location=event.location,
                    confidence=event.confidence,
                ))
                await broadcast({"type": "alert", "data": alert.model_dump(mode="json")})
        finally:
            db.close()
