from fastapi import APIRouter
from schemas import CodeExecutionRequest, CodeExecutionResponse
from services.judge0_service import Judge0Service

router = APIRouter(prefix="/execute", tags=["Code Execution"])

@router.post("/run", response_model=CodeExecutionResponse)
def execute_code(req: CodeExecutionRequest):
    result = Judge0Service.execute_code(
        language=req.language,
        source_code=req.source_code,
        stdin=req.custom_input
    )
    return result
