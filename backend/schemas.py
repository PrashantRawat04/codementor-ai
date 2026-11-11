from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    roll_number: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict

class ProblemResponse(BaseModel):
    id: int
    title: str
    slug: str
    difficulty: str
    category: str
    description: str
    constraints: Optional[str]
    sample_input: Optional[str]
    sample_output: Optional[str]
    starter_code: Dict[str, str]

class CodeExecutionRequest(BaseModel):
    problem_id: int
    language: str
    source_code: str
    custom_input: Optional[str] = ""

class CodeExecutionResponse(BaseModel):
    verdict: str
    stdout: Optional[str] = ""
    stderr: Optional[str] = ""
    execution_time_ms: float
    memory_kb: int

class HintRequest(BaseModel):
    problem_id: int
    current_code: str
    hint_level: int

class MentorQueryRequest(BaseModel):
    problem_id: int
    current_code: str
    user_query: str
    execution_result: Optional[str] = ""
    use_rag: bool = True
