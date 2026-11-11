from fastapi import APIRouter
from services.rag_engine import rag_retriever

router = APIRouter(prefix="/rag", tags=["RAG Inspection"])

@router.get("/retrieve")
def retrieve_docs(query: str):
    docs = rag_retriever.retrieve(query)
    return {"query": query, "retrieved_results": docs}
