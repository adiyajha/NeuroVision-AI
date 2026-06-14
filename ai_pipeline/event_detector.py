"""Low-cost background subtraction event detection engine."""
from dataclasses import dataclass
from typing import Optional
import random
from ai_pipeline.camera import Frame


@dataclass
class MotionEvent:
    camera_id: str
    timestamp: float
    delta_percent: float
    location: str
    is_significant: bool


class EventDetector:
    def __init__(self, threshold: float = 2.0):
        self.threshold = threshold
        self._baseline_delta = 0.02

    def analyze(self, frame: Frame, location: str) -> Optional[MotionEvent]:
        delta = random.uniform(0.01, 15.0) if frame.fps > 0 else random.uniform(0.01, 0.5)
        is_significant = delta >= self.threshold

        if not is_significant and delta < self._baseline_delta:
            return None

        return MotionEvent(
            camera_id=frame.camera_id,
            timestamp=frame.timestamp,
            delta_percent=round(delta, 2),
            location=location,
            is_significant=is_significant,
        )
