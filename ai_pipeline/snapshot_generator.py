"""Snapshot generator — caches high-resolution frames on alert triggers."""
from dataclasses import dataclass
from pathlib import Path
import time
import uuid


@dataclass
class Snapshot:
    id: str
    camera_id: str
    timestamp: float
    file_path: str
    event_type: str


class SnapshotGenerator:
    def __init__(self, output_dir: str = "./snapshots"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def generate(self, camera_id: str, frame_data: bytes, event_type: str) -> Snapshot:
        snapshot_id = str(uuid.uuid4())[:8]
        filename = f"{snapshot_id}_{camera_id}.jpg"
        path = self.output_dir / filename

        # Mock: write placeholder bytes
        path.write_bytes(frame_data or b"mock_snapshot_data")

        return Snapshot(
            id=snapshot_id,
            camera_id=camera_id,
            timestamp=time.time(),
            file_path=str(path),
            event_type=event_type,
        )
