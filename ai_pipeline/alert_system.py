"""Alert system — pushes events to WebSocket, email, and webhook targets."""
from dataclasses import dataclass, field
from typing import Callable, Awaitable
import time
import uuid


@dataclass
class Alert:
    id: str
    timestamp: float
    severity: str
    message: str
    location: str
    confidence: float
    channels: list[str] = field(default_factory=list)


class AlertSystem:
    def __init__(self):
        self._subscribers: list[Callable[[Alert], Awaitable[None]]] = []
        self._history: list[Alert] = []

    def subscribe(self, callback: Callable[[Alert], Awaitable[None]]):
        self._subscribers.append(callback)

    async def fire(self, severity: str, message: str, location: str, confidence: float) -> Alert:
        channels = []
        if severity in ("high", "critical"):
            channels.extend(["websocket", "webhook"])
        else:
            channels.append("websocket")

        alert = Alert(
            id=str(uuid.uuid4())[:8],
            timestamp=time.time(),
            severity=severity,
            message=message,
            location=location,
            confidence=confidence,
            channels=channels,
        )
        self._history.append(alert)

        for subscriber in self._subscribers:
            await subscriber(alert)

        return alert

    def get_history(self, limit: int = 20) -> list[Alert]:
        return self._history[-limit:]
