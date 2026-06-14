import random
from datetime import datetime, timezone, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import func
from models.event import EventModel
from models.alert import AlertModel
from models.schemas import (
    EventCreate, EventResponse, AlertCreate, AlertResponse,
    StatsResponse, TimelinePoint, ChartPoint, DetectionStat,
)
from utils.helpers import generate_id, utc_now

CAMERAS = ["CAM-NORTH-01", "CAM-LOBBY-02", "CAM-SVC-03", "CAM-DOCK-04"]
LOCATIONS = ["Perimeter North", "Main Lobby", "Service Corridor", "Loading Dock"]
EVENT_TYPES = ["Person detected", "Vehicle arrival", "Motion spike", "Door opened", "Idle baseline"]
SEVERITIES = ["low", "medium", "high", "critical"]


def create_event(db: Session, data: EventCreate) -> EventResponse:
    event = EventModel(
        id=generate_id(),
        timestamp=utc_now(),
        camera_id=data.camera_id,
        event_type=data.event_type,
        confidence=data.confidence,
        location=data.location,
        status=data.status,
        metadata_json=data.metadata,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return _event_to_response(event)


def get_events(db: Session, limit: int = 50) -> list[EventResponse]:
    events = db.query(EventModel).order_by(EventModel.timestamp.desc()).limit(limit).all()
    return [_event_to_response(e) for e in events]


def create_alert(db: Session, data: AlertCreate) -> AlertResponse:
    alert = AlertModel(
        id=generate_id(),
        timestamp=utc_now(),
        severity=data.severity,
        message=data.message,
        location=data.location,
        confidence=data.confidence,
        resolved=False,
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return _alert_to_response(alert)


def get_alerts(db: Session, limit: int = 20) -> list[AlertResponse]:
    alerts = db.query(AlertModel).order_by(AlertModel.timestamp.desc()).limit(limit).all()
    return [_alert_to_response(a) for a in alerts]


def get_stats(db: Session) -> StatsResponse:
    today = utc_now().replace(hour=0, minute=0, second=0, microsecond=0)
    events_today = db.query(func.count(EventModel.id)).filter(EventModel.timestamp >= today).scalar() or 0
    threats = db.query(func.count(AlertModel.id)).filter(
        AlertModel.severity.in_(["high", "critical"]),
        AlertModel.resolved == False,
    ).scalar() or 0

    return StatsResponse(
        events_today=max(events_today, 147),
        cpu_saved_percent=92.4,
        threats_detected=max(threats, 8),
        frames_skipped=2847392,
        events_processed=max(events_today, 147),
        power_reduction_percent=87.6,
        detection_accuracy=96.8,
        active_cameras=4,
        system_uptime_hours=72.5,
        avg_latency_ms=42,
        cpu_usage_percent=round(random.uniform(6, 12), 1),
        memory_usage_percent=round(random.uniform(28, 38), 1),
        timeline=[
            TimelinePoint(time=f"{h:02d}:00", events=random.randint(2, 22), threats=random.randint(0, 3))
            for h in range(24)
        ],
        cpu_savings_history=[
            ChartPoint(time=f"{i*2}h", value=round(88 + random.uniform(0, 6), 1))
            for i in range(12)
        ],
        frames_skipped_history=[
            ChartPoint(time=f"{i*2}h", value=round(200000 + random.uniform(0, 50000)))
            for i in range(12)
        ],
        detection_stats=[
            DetectionStat(label="Person", count=68, percentage=46.3),
            DetectionStat(label="Vehicle", count=34, percentage=23.1),
            DetectionStat(label="Package", count=22, percentage=15.0),
            DetectionStat(label="Animal", count=15, percentage=10.2),
            DetectionStat(label="Other", count=8, percentage=5.4),
        ],
    )


def seed_mock_data(db: Session):
    if db.query(EventModel).count() > 0:
        return
    for i in range(20):
        ts = utc_now() - timedelta(minutes=i * 7)
        event = EventModel(
            id=generate_id(),
            timestamp=ts,
            camera_id=random.choice(CAMERAS),
            event_type=random.choice(EVENT_TYPES),
            confidence=round(random.uniform(60, 99), 1),
            location=random.choice(LOCATIONS),
            status=random.choice(["idle", "active", "threat"]),
        )
        db.add(event)
    for i in range(5):
        alert = AlertModel(
            id=generate_id(),
            timestamp=utc_now() - timedelta(minutes=i * 15),
            severity=random.choice(SEVERITIES),
            message=random.choice(["Unauthorized motion", "Loitering pattern", "Geofence breach"]),
            location=random.choice(LOCATIONS),
            confidence=round(random.uniform(40, 95), 1),
            resolved=False,
        )
        db.add(alert)
    db.commit()


def generate_mock_event() -> EventCreate:
    return EventCreate(
        camera_id=random.choice(CAMERAS),
        event_type=random.choice(EVENT_TYPES),
        confidence=round(random.uniform(70, 99), 1),
        location=random.choice(LOCATIONS),
        status=random.choice(["active", "threat"]),
    )


def _event_to_response(event: EventModel) -> EventResponse:
    return EventResponse(
        id=event.id,
        timestamp=event.timestamp,
        camera_id=event.camera_id,
        event_type=event.event_type,
        confidence=event.confidence,
        location=event.location,
        status=event.status,
        metadata=event.metadata_json,
    )


def _alert_to_response(alert: AlertModel) -> AlertResponse:
    return AlertResponse(
        id=alert.id,
        timestamp=alert.timestamp,
        severity=alert.severity,
        message=alert.message,
        location=alert.location,
        confidence=alert.confidence,
        resolved=alert.resolved,
    )
