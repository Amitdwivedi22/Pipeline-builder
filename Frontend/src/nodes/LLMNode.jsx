import React from 'react';
import BaseNode from './BaseNode';

const LLMNode = ({ data }) => {
  const nodeData = {
    ...data,
    title: 'LLM',
    content: 'Large Language Model processing',
    inputs: [
      { id: 'prompt', label: 'Prompt' },
      { id: 'context', label: 'Context' },
    ],
    outputs: [{ id: 'response', label: 'Response' }],
  };

  return <BaseNode data={nodeData} />;
};

export default LLMNode;