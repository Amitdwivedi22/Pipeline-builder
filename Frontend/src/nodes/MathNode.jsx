import React from 'react';
import BaseNode from './BaseNode';

const MathNode = ({ data }) => {
  const nodeData = {
    ...data,
    title: 'Math',
    content: 'Performs mathematical operations',
    inputs: [
      { id: 'a', label: 'A' },
      { id: 'b', label: 'B' },
    ],
    outputs: [{ id: 'result', label: 'Result' }],
  };

  return <BaseNode data={nodeData} />;
};

export default MathNode;