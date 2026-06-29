import { ReactFlow, Background, Controls, MiniMap, addEdge } from "reactflow";
import "reactflow/dist/style.css";
import {useState} from "react";
import FlowNode from "../components/workflow/FlowNode";

const nodeTypes = {
    custom: FlowNode,
};

const initialNodes = [
  {
    id: "1",
    type:"workflowNode",
    position: { x: 100, y: 100 },
    data: { label: "Start" },
  },
  {
    id: "2",
    type:"workflowNode",
    position: { x: 400, y: 100 },
    data: { label: "Backend" },
  },
  {
    id: "3",
    type:"workflowNode",
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

    const addNewNode = () => {
        const newNode = {
            id: Date.now().toString(),

            position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
            },
            data: { label: "New Node" },
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
    };
    
    return (
    <div className="w-full h-screen">

      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <button
            onClick={addNewNode}
            className="absolute top-4 left-4 z-10 bg-black text-white px-4 py-2 rounded"
        >
            Add Node
        </button>
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default WorkflowPage;