import React from 'react';
import BaseNode from './BaseNode';

const MergeNode = ({ data }) => {
  const nodeData = {
    ...data,
    title: 'Merge',
    content: 'Merges multiple inputs',
    inputs: [
      { id: 'input1', label: 'Input 1' },
      { id: 'input2', label: 'Input 2' },
    ],
    outputs: [{ id: 'output', label: 'Output' }],
  };

  return <BaseNode data={nodeData} />;
};

export default MergeNode;