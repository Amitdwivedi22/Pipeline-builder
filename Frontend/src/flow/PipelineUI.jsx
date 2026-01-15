import React, { useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { BarChart } from 'lucide-react';
import useStore from '../store/usestore';
import { useToast } from '../components/Toast/useToast';

const AnalyzeButton = () => {
  const { nodes, edges } = useStore();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const analyzePipeline = async () => {
    if (nodes.length === 0) {
      toast.error('Please add nodes to the pipeline before analyzing');
      return;
    }

    setLoading(true);
    toast.info('Analyzing pipeline structure...');

    try {
      const response = await fetch('http://localhost:8000/pipelines/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map((n) => ({ id: n.id })),
          edges: edges.map((e) => ({ source: e.source, target: e.target })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to analyze pipeline');
      }

      const data = await response.json();
      
      if (data.is_dag) {
        toast.success(
          `✓ Valid DAG! Nodes: ${data.num_nodes} | Edges: ${data.num_edges}`,
          5000
        );
      } else {
        toast.error(
          `✗ Pipeline contains cycles! Nodes: ${data.num_nodes} | Edges: ${data.num_edges}`,
          5000
        );
      }
    } catch (error) {
      toast.error(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={analyzePipeline} disabled={loading} className="btn-info">
      <BarChart className="w-5 h-5" style={{ width: '20px', height: '20px' }} />
      <span>{loading ? 'Analyzing...' : 'Analyze Pipeline'}</span>
    </button>
  );
};

const PipelineUI = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useStore();
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: { label: `${type} node` },
    };

    addNode(newNode);
  };

  return (
    <div style={{ width: '100%', height: '100vh', paddingTop: '72px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        snapToGrid
        snapGrid={[15, 15]}
        fitView
        style={{ marginLeft: '280px' }}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={20} size={1} color="#8b5cf6" />
      </ReactFlow>
    </div>
  );
};

PipelineUI.AnalyzeButton = AnalyzeButton;

export default PipelineUI;
