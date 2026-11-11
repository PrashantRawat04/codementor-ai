from fastapi import APIRouter
from schemas import HintRequest, MentorQueryRequest
from services.ai_mentor import ai_mentor

router = APIRouter(prefix="/mentor", tags=["AI Mentor"])

@router.post("/hint")
def get_progressive_hint(req: HintRequest):
    hint = ai_mentor.get_progressive_hint(
        problem_title="Two Sum",
        current_code=req.current_code,
        level=req.hint_level
    )
    return {"level": req.hint_level, "hint": hint}

@router.post("/explain")
def ask_ai_mentor(req: MentorQueryRequest):
    result = ai_mentor.analyze_code_and_explain(
        problem_title="Two Sum",
        code=req.current_code,
        user_query=req.user_query,
        execution_result=req.execution_result or "",
        use_rag=req.use_rag
    )
    return result
