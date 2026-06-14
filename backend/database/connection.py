from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from utils.config import get_settings

settings = get_settings()
engine = create_engine(
    settings.database_url,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from models.event import EventModel  # noqa: F401
    from models.alert import AlertModel  # noqa: F401
    Base.metadata.create_all(bind=engine)
