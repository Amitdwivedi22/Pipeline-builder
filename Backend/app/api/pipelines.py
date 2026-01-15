from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any
from app.core.dag import DAGValidator

router = APIRouter(prefix="/pipelines", tags=["pipelines"])

class PipelineAnalysisRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

class PipelineAnalysisResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def analyze_logic(nodes, edges):
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag = DAGValidator.is_dag(nodes, edges)

    return PipelineAnalysisResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag,
    )


#  USED BY SUBMIT PIPELINE
@router.post("/parse", response_model=PipelineAnalysisResponse)
async def parse_pipeline(request: PipelineAnalysisRequest):
    return analyze_logic(request.nodes or [], request.edges or [])


#  USED BY ANALYZE PIPELINE
@router.post("/analyze", response_model=PipelineAnalysisResponse)
async def analyze_pipeline(request: PipelineAnalysisRequest):
    return analyze_logic(request.nodes or [], request.edges or [])
