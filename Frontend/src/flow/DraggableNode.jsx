import React from 'react';
import { Circle, LogIn, LogOut, Network, Calculator, Merge } from 'lucide-react';

const iconMap = {
  default: Circle,
  input: LogIn,
  output: LogOut,
  llm: Network,
  math: Calculator,
  merge: Merge,
};

const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const Icon = iconMap[type] || Circle;

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      className="draggable-node-card"
    >
      <Icon className="draggable-node-icon" />
      <div className="draggable-node-label">{label}</div>
    </div>
  );
};

export default DraggableNode;