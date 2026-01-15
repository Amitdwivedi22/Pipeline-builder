import React, { useRef, useEffect, useState } from 'react';
import { Handle, Position, useUpdateNodeInternals } from 'reactflow';
import { parseVariables } from '../utils/textParser';

const TextNode = ({ data, id }) => {
  const { title = 'Text', text = '', outputs = [] } = data;
  const [nodeText, setNodeText] = useState(text);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  const variables = parseVariables(nodeText);
  const inputs = variables.map((variable) => ({ id: variable, label: variable }));

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [nodeText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, updateNodeInternals, id]);

  const handleTextChange = (e) => {
    setNodeText(e.target.value);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 min-w-[200px] transition-all duration-200">
      {/* Title */}
      <div className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </div>

      {/* Textarea Content */}
      <textarea
        ref={textareaRef}
        value={nodeText}
        onChange={handleTextChange}
        className="w-full text-sm text-gray-600 resize-none overflow-hidden border-none outline-none bg-transparent"
        placeholder="Enter text..."
        style={{ minHeight: '24px' }}
      />

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

export default TextNode;