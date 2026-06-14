from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, Literal


class EventCreate(BaseModel):
    camera_id: str
    event_type: str
    confidence: float = Field(ge=0, le=100)
    location: str
    status: Literal["idle", "active", "threat"] = "active"
    metadata: Optional[dict] = None


class EventResponse(BaseModel):
    id: str
    timestamp: datetime
    camera_id: str
    event_type: str
    confidence: float
    location: str
    status: str
    metadata: Optional[dict] = None

    class Config:
        from_attributes = True


class AlertCreate(BaseModel):
    severity: Literal["low", "medium", "high", "critical"]
    message: str
    location: str
    confidence: float = Field(ge=0, le=100)


class AlertResponse(BaseModel):
    id: str
    timestamp: datetime
    severity: str
    message: str
    location: str
    confidence: float
    resolved: bool

    class Config:
        from_attributes = True


class ChartPoint(BaseModel):
    time: str
    value: float


class TimelinePoint(BaseModel):
    time: str
    events: int
    threats: int


class DetectionStat(BaseModel):
    label: str
    count: int
    percentage: float


class ResourcePoint(BaseModel):
    time: str
    cpu: float
    memory: float


class StatsResponse(BaseModel):
    events_today: int
    cpu_saved_percent: float
    threats_detected: int
    frames_skipped: int
    events_processed: int
    power_reduction_percent: float
    detection_accuracy: float
    active_cameras: int
    system_uptime_hours: float
    avg_latency_ms: float
    cpu_usage_percent: float
    memory_usage_percent: float
    timeline: list[TimelinePoint]
    cpu_savings_history: list[ChartPoint]
    frames_skipped_history: list[ChartPoint]
    detection_stats: list[DetectionStat]
    resource_utilization_history: list[ResourcePoint]


class HealthResponse(BaseModel):
    status: Literal["healthy", "degraded", "critical"]
    uptime_seconds: float
    pipeline_active: bool
    websocket_connections: int
    last_event_at: Optional[datetime]


class SnapshotResponse(BaseModel):
    id: str
    timestamp: datetime
    camera_id: str
    event_type: str
    thumbnail_url: str
