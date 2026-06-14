from sqlalchemy import Column, String, Float, DateTime, JSON
from database.connection import Base


class EventModel(Base):
    __tablename__ = "events"

    id = Column(String, primary_key=True)
    timestamp = Column(DateTime, nullable=False)
    camera_id = Column(String, nullable=False)
    event_type = Column(String, nullable=False)
    confidence = Column(Float, default=0.0)
    location = Column(String, nullable=False)
    status = Column(String, default="active")
    metadata_json = Column(JSON, nullable=True)
