import { ReactFlow, Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import {useState} from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 100, y: 100 },
    data: { label: "Start" },
  },
  {
    id: "2",
    position: { x: 400, y: 100 },
    data: { label: "Backend" },
  },
  {
    id: "3",
    position: { x: 700, y: 100 },
    data: { label: "Database" },
  },
];
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
];
    
function WorkflowPage() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    
    return (
    <div className="w-full h-screen">

      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default WorkflowPage;