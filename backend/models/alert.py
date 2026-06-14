from sqlalchemy import Column, String, Float, DateTime, Boolean
from database.connection import Base


class AlertModel(Base):
    __tablename__ = "alerts"

    id = Column(String, primary_key=True)
    timestamp = Column(DateTime, nullable=False)
    severity = Column(String, nullable=False)
    message = Column(String, nullable=False)
    location = Column(String, nullable=False)
    confidence = Column(Float, default=0.0)
    resolved = Column(Boolean, default=False)
