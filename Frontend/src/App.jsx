import { useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { Plus, Network } from 'lucide-react';

import useStore from './store/usestore';
import PipelineUI from './flow/PipelineUI';
import Toolbar from './flow/Toolbar';
import SubmitButton from './components/SubmitButton';
import { ToastProvider } from './components/Toast/ToastProvider';

function AppContent() {
  const { nodes, addNode } = useStore();

  const handleAddNode = useCallback(() => {
    const newNode = {
      id: `node-${Date.now()}`,
      position: {
        x: Math.random() * 400,
        y: Math.random() * 400,
      },
      data: { label: `Node ${nodes.length + 1}` },
      type: 'default',
    };

    addNode(newNode);
  }, [addNode, nodes.length]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Header Bar */}
      <header className="app-header">
        <div className="flex items-center gap-3">
          <Network className="w-8 h-8 text-purple-600" />
          <h1 className="app-title">Pipeline Builder</h1>
        </div>
        
        <div className="button-group">
          <button onClick={handleAddNode} className="btn-primary">
            <Plus className="w-5 h-5" style={{ width: '20px', height: '20px' }} />
            <span>Add Node</span>
          </button>
          <SubmitButton />
          <PipelineUI.AnalyzeButton />
        </div>
      </header>

      <Toolbar />
      <PipelineUI />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <ReactFlowProvider>
        <AppContent />
      </ReactFlowProvider>
    </ToastProvider>
  );
}
