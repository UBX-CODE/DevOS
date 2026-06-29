import { Handle, Position } from "reactflow";

interface FlowNodeProps {
  data: {
    label: string;
  };
}

function FlowNode({ data }: FlowNodeProps) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md px-5 py-3 min-w-[150px]">
      <Handle type="target" position={Position.Left}/>
      <h3 className="font-medium">
        {data.label}
      </h3>
      <Handle type="source" position={Position.Right}/>
    </div>
  );
}

export default FlowNode;