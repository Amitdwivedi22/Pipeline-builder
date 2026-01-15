import React from 'react';
import BaseNode from './BaseNode';

const InputNode = ({ data }) => {
  const nodeData = {
    ...data,
    title: 'Input',
    content: 'Provides input data',
    inputs: [],
    outputs: [{ id: 'output', label: 'Output' }],
  };

  return <BaseNode data={nodeData} />;
};

export default InputNode;