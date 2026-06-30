import { ReactFlow, Background, Controls, MiniMap, addEdge , type Connection, useEdgesState, useNodesState} from "reactflow";
import "reactflow/dist/style.css";
import {useState} from "react";
import FlowNode from "../components/workflow/FlowNode";
import PropertiesPanel from "../components/workflow/PropertiesPanel";

const nodeTypes = {
  workflowNode: FlowNode,
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
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [selectedEdge, setSelectedEdge] = useState<any>(null);

    const addNewNode = () => {
        const newNode = {
            id: Date.now().toString(),
            type: "workflowNode",
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
            },
            data: { label: "New Node" },
        };

        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    const deleteNode = () => {
        if (!selectedNode) return;
        setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
        setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
        setSelectedNode(null);
    };

    const deleteEdge = () => {
        if (!selectedEdge) return;
        setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
        setSelectedEdge(null);
    };

    const updateNodeLabel = (label: string) => {
  if (!selectedNode) return;

  setNodes((nds) =>
    nds.map((node) =>
      node.id === selectedNode.id
        ? {
            ...node,
            data: {
              ...node.data,
              label,
            },
          }
        : node
    )
  );

  setSelectedNode((prev: any) =>
    prev
      ? {
          ...prev,
          data: {
            ...prev.data,
            label,
          },
        }
      : null
  );
};
    
    return (
      <div className="flex h-screen">
    <div className="flex-1 h-full relative">
      <ReactFlow 
        nodes={nodes} 
        edges={edges} 
        nodeTypes={nodeTypes} 
        onEdgesChange={onEdgesChange} 
        onNodesChange={onNodesChange} 
        onConnect={onConnect} 
        fitView 
        onNodeClick={(_, node) => {
          setSelectedEdge(null);
          setSelectedNode(node);
        }}
        onEdgeClick={(_, edge) => {
          setSelectedNode(null);
          setSelectedEdge(edge);
        }}
        onPaneClick={() => {
          setSelectedNode(null);
          setSelectedEdge(null);
        }}
        onNodesDelete={(deleted) => {
          if (selectedNode && deleted.find(n => n.id === selectedNode.id)) {
            setSelectedNode(null);
          }
        }}
        onEdgesDelete={(deleted) => {
          if (selectedEdge && deleted.find(e => e.id === selectedEdge.id)) {
            setSelectedEdge(null);
          }
        }}
      >
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
     {(selectedNode || selectedEdge) && (
        <PropertiesPanel
        selectedNode={selectedNode}
        selectedEdge={selectedEdge}
        onLabelChange={updateNodeLabel}
        onDeleteNode={deleteNode}
        onDeleteEdge={deleteEdge}
    />)}
    </div>
  );
}

export default WorkflowPage;