import React from 'react';
import { Send } from 'lucide-react';
import useStore from '../store/usestore';
import { submitPipeline } from '../services/pipelineApi';
import { useToast } from './Toast/useToast';

const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const toast = useToast();

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      toast.error('Please add nodes to the pipeline before submitting');
      return;
    }

    try {
      const result = await submitPipeline(nodes, edges);
      console.log('Pipeline submitted successfully:', result);
      toast.success('Pipeline submitted successfully! 🎉');
    } catch (error) {
      console.error('Failed to submit pipeline:', error);
      toast.error(`Failed to submit pipeline: ${error.message}`);
    }
  };

  return (
    <button onClick={handleSubmit} className="btn-success">
      <Send className="w-5 h-5" style={{ width: '20px', height: '20px' }} />
      <span>Submit Pipeline</span>
    </button>
  );
};

export default SubmitButton;