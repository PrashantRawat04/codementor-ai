import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CodeMentor AI"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./codementor.db")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "gehu_cse_secret_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    JUDGE0_API_URL: str = os.getenv("JUDGE0_API_URL", "https://ce.judge0.com")

settings = Settings()
