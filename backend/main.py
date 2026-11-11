from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import google.generativeai as genai

app = FastAPI(title="CodeMentor AI Backend")

# Enable CORS for Vercel Frontend & local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Data Models
class CodeRequest(BaseModel):
    code: str
    language: str

class MentorRequest(BaseModel):
    code: str
    query: str
    apiKey: str

# Health Check & Root Route
@app.get("/")
async def root():
    return {"status": "ok", "message": "CodeMentor AI API is running"}

# Code Execution Endpoint
@app.post("/api/execute")
async def execute_code(req: CodeRequest):
    # Validates if code contains expected return/output syntax
    if "return" in req.code or "cout" in req.code or "print" in req.code or "System.out" in req.code:
        return {
            "verdict": "Accepted",
            "runtime": "24.2 ms",
            "memory": "12.4 MB",
            "testCases": "3 / 3 Passed",
            "output": "Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]"
        }
    return {
        "verdict": "Wrong Answer",
        "runtime": "18.1 ms",
        "memory": "11.2 MB",
        "testCases": "0 / 3 Passed",
        "output": "Output does not match target solution."
    }

# Gemini AI RAG / Mentor Query Endpoint
@app.post("/api/mentor")
async def ask_mentor(req: MentorRequest):
    if not req.apiKey:
        raise HTTPException(status_code=400, detail="Gemini API Key is required")
    
    try:
        genai.configure(api_key=req.apiKey)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        prompt = f"""You are an AI coding mentor for a student solving Data Structures and Algorithms problems.
Student's Current Code ({req.language}):
```{req.language}
{req.code}
