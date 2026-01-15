import React from 'react';
import DraggableNode from './DraggableNode';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <h3>Node Palette</h3>
      <div className="space-y-2">
        <DraggableNode type="default" label="Default Node" />
        <DraggableNode type="input" label="Input Node" />
        <DraggableNode type="llm" label="LLM Node" />
        <DraggableNode type="math" label="Math Node" />
        <DraggableNode type="merge" label="Merge Node" />
        <DraggableNode type="output" label="Output Node" />
      </div>
    </div>
  );
};

export default Toolbar;