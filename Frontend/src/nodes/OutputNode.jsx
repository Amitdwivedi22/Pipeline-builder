import React from 'react';
import BaseNode from './BaseNode';

const OutputNode = ({ data }) => {
  const nodeData = {
    ...data,
    title: 'Output',
    content: 'Receives output data',
    inputs: [{ id: 'input', label: 'Input' }],
    outputs: [],
  };

  return <BaseNode data={nodeData} />;
};

export default OutputNode;