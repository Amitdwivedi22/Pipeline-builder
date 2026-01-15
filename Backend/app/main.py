from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.pipelines import router as pipeline_router

app = FastAPI(title="Pipeline API")

#  FIXED: allow all frontend ports you use
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pipeline_router)

@app.get("/")
def read_root():
    return {"message": "Pipeline API is running"}
