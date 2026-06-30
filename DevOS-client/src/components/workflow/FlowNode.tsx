import { Handle, Position, useReactFlow } from "reactflow";
import { useState, type KeyboardEvent } from "react";

interface FlowNodeProps {
    id:string,
    selected?: boolean;
  data: {
    label: string;
    onLabelChange?: (id: string, label: string) => void;
  };
}

function FlowNode({ id, selected, data }: FlowNodeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data.label);
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const handleSave = () => {
    setIsEditing(false);
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === id) {
          return { ...n, data: { ...n.data, label: value } };
        }
        return n;
      })
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue(data.label);
    }
  };

  return (
    <div onDoubleClick = {() => {
      setIsEditing(true);
      setValue(data.label);
    }}
    className={`bg-white border rounded-lg px-5 py-3 min-w-[150px] transition-shadow ${
      selected ? "border-[#111] shadow-lg ring-1 ring-[#111]" : "border-gray-300 shadow-md hover:shadow-lg"
    }`}>
      <Handle type="target" position={Position.Left}/>
      {isEditing ? (
        <input 
          autoFocus
          className="nodrag border-none outline-none bg-transparent w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h3 className="font-medium text-center">{data.label}</h3>
      )}
      <Handle type="source" position={Position.Right}/>
    </div>
  );
}

export default FlowNode;