import React from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ data }) => {
  const { title, content, inputs = [], outputs = [] } = data;

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 min-w-[200px]">
      {/* Title */}
      <div className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </div>

      {/* Content Area */}
      <div className="text-sm text-gray-600 mb-4">
        {content}
      </div>

      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={input.id}
          id={input.id}
          type="target"
          position={Position.Left}
          style={{
            top: `${(index + 1) * (100 / (inputs.length + 1))}%`,
          }}
          className="w-3 h-3 bg-blue-500 border-2 border-white"
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={output.id}
          id={output.id}
          type="source"
          position={Position.Right}
          style={{
            top: `${(index + 1) * (100 / (outputs.length + 1))}%`,
          }}
          className="w-3 h-3 bg-green-500 border-2 border-white"
        />
      ))}
    </div>
  );
};

export default BaseNode;