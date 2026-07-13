import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from models import Base, engine
from routes import projects_router, contact_router, skills_router

load_dotenv()

# Create all tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Portfolio API",
    description="Backend para portfólio de desenvolvedor",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
origins = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(projects_router, prefix="/api")
app.include_router(contact_router, prefix="/api")
app.include_router(skills_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "Portfolio API v1.0",
        "docs": "/docs",
        "status": "online",
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
