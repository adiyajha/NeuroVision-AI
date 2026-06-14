from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "NeuroVision AI API"
    database_url: str = "sqlite:///./neurovision.db"
    cors_origins: str = "http://localhost:5173,https://neurovision-ai-desig-0vqb.bolt.host"
    mock_event_interval: float = 5.0

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
