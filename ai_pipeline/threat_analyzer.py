"""Threat analysis rules engine — matches detections against alert policies."""
from dataclasses import dataclass
from typing import Optional
from ai_pipeline.object_detector import Detection


@dataclass
class ThreatAssessment:
    is_threat: bool
    severity: str
    message: str
    confidence: float


THREAT_LABELS = {"person", "vehicle"}
HIGH_CONFIDENCE = 85.0


class ThreatAnalyzer:
    def __init__(self, rules: Optional[dict] = None):
        self.rules = rules or {"geofence_enabled": True, "loitering_threshold_s": 30}

    def analyze(self, detections: list[Detection], location: str) -> Optional[ThreatAssessment]:
        if not detections:
            return None

        top = max(detections, key=lambda d: d.confidence)
        is_threat = top.label in THREAT_LABELS and top.confidence >= 70

        if not is_threat:
            return ThreatAssessment(
                is_threat=False,
                severity="low",
                message=f"{top.label} detected (non-threat)",
                confidence=top.confidence,
            )

        severity = "critical" if top.confidence >= 95 else "high" if top.confidence >= HIGH_CONFIDENCE else "medium"
        return ThreatAssessment(
            is_threat=True,
            severity=severity,
            message=f"Unauthorized {top.label} at {location}",
            confidence=top.confidence,
        )
