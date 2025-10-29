from pydantic_settings import BaseSettings , SettingsConfigDict

from typing import List

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    APP_NAME: str = "Course Planner"
    DEBUG: bool = False
    ALLOWED_HOSTS: List[str] = ["*"]
    DATABASE_URL: str = "sqlite:///./test.db"
    SECRET_KEY: str = "your-secret-key"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

settings = Settings()