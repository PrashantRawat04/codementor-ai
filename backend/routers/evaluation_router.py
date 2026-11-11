from fastapi import APIRouter
from services.evaluation_service import EvaluationBenchmarkService
from services.recommendation_service import RecommendationService

router = APIRouter(prefix="/evaluation", tags=["Evaluation & Recommendations"])

@router.get("/benchmark")
def get_rag_evaluation_benchmark():
    return EvaluationBenchmarkService.run_benchmark()

@router.get("/recommendations/{roll_number}")
def get_user_recommendations(roll_number: str):
    return RecommendationService.get_user_recommendations(roll_number)
