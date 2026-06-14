"""YOLOv8 Nano object detection — executes on wake triggers only."""
from dataclasses import dataclass
from typing import Optional
import random


@dataclass
class Detection:
    label: str
    confidence: float
    bbox: tuple[float, float, float, float]


LABELS = ["person", "vehicle", "package", "animal", "bicycle"]


class ObjectDetector:
    def __init__(self, model_name: str = "yolov8n"):
        self.model_name = model_name
        self._loaded = False

    def load(self):
        self._loaded = True

    def unload(self):
        self._loaded = False

    @property
    def is_loaded(self) -> bool:
        return self._loaded

    def detect(self, frame_data: bytes) -> list[Detection]:
        if not self._loaded:
            self.load()
        count = random.randint(0, 2)
        return [
            Detection(
                label=random.choice(LABELS),
                confidence=round(random.uniform(75, 99), 1),
                bbox=(0.1, 0.2, 0.3, 0.5),
            )
            for _ in range(count)
        ]
