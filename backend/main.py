from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from database import Base, engine
from routers import auth_router, problem_router, execution_router, mentor_router, rag_router, evaluation_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="CodeMentor AI Platform backend for Graphic Era Hill University B.Tech CSE Major Project"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router, prefix=settings.API_PREFIX)
app.include_router(problem_router.router, prefix=settings.API_PREFIX)
app.include_router(execution_router.router, prefix=settings.API_PREFIX)
app.include_router(mentor_router.router, prefix=settings.API_PREFIX)
app.include_router(rag_router.router, prefix=settings.API_PREFIX)
app.include_router(evaluation_router.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "status": "online",
        "project": settings.PROJECT_NAME,
        "university": "Graphic Era Hill University, Dehradun",
        "team": ["Prashant Rawat (2319255)", "Ravi Prakash (2219417)", "Himanshu Negi (2318873)"],
        "docs_url": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
