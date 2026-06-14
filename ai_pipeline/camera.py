"""Video acquisition module — establishes RTSP/RTMP endpoints with adaptive framerate."""
from dataclasses import dataclass, field
from typing import Optional, Callable
import time
import random


@dataclass
class Frame:
    camera_id: str
    timestamp: float
    data: bytes = field(default=b"")
    width: int = 1920
    height: int = 1080
    fps: float = 30.0


@dataclass
class CameraConfig:
    camera_id: str
    source: str
    location: str
    target_fps: float = 30.0
    sleep_fps: float = 0.0


class Camera:
    def __init__(self, config: CameraConfig):
        self.config = config
        self._active = False
        self._frame_count = 0

    @property
    def is_active(self) -> bool:
        return self._active

    def capture_frame(self) -> Frame:
        self._frame_count += 1
        return Frame(
            camera_id=self.config.camera_id,
            timestamp=time.time(),
            fps=self.config.target_fps if self._active else self.config.sleep_fps,
        )

    def set_active(self, active: bool):
        self._active = active

    def stream(self, callback: Callable[[Frame], None], duration: float = 10.0):
        """Mock streaming loop for development."""
        start = time.time()
        while time.time() - start < duration:
            frame = self.capture_frame()
            callback(frame)
            interval = 1.0 / (self.config.target_fps or 1)
            time.sleep(interval * (0.1 if not self._active else 1.0))


def create_camera(camera_id: str, source: str, location: str) -> Camera:
    return Camera(CameraConfig(camera_id=camera_id, source=source, location=location))
