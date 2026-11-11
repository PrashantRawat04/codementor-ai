from sqlalchemy import Column, Integer, String, Text, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    roll_number = Column(String(50), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(20), default="student")
    created_at = Column(DateTime, default=datetime.utcnow)

    submissions = relationship("Submission", back_populates="user")
    progress = relationship("UserProgress", back_populates="user")

class Problem(Base):
    __tablename__ = "problems"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    difficulty = Column(String(20), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    constraints = Column(Text)
    sample_input = Column(Text)
    sample_output = Column(Text)
    starter_code = Column(JSON)

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    problem_id = Column(Integer, ForeignKey("problems.id"))
    language = Column(String(30), nullable=False)
    source_code = Column(Text, nullable=False)
    verdict = Column(String(50), nullable=False)
    execution_time_ms = Column(Float)
    memory_kb = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="submissions")

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    topic = Column(String(100), nullable=False)
    mastery_score = Column(Float, default=0.0)
    solved_count = Column(Integer, default=0)

    user = relationship("User", back_populates="progress")
