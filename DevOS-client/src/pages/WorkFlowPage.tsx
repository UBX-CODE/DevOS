import { ReactFlow, Background, Controls, MiniMap, addEdge , type Connection, useEdgesState, useNodesState} from "reactflow";
import "reactflow/dist/style.css";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import FlowNode from "../components/workflow/FlowNode";
import PropertiesPanel from "../components/workflow/PropertiesPanel";
import Toolbar from "../components/workflow/Toolbar";
import{updateWorkflow, getWorkflow} from "../services/workflow.service";


const nodeTypes = {workflowNode: FlowNode,};

function WorkflowPage() {
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const onConnect = (connection: Connection) => setEdges((eds) => addEdge(connection, eds));
    const [selectedNode, setSelectedNode] = useState<any>(null);
    const [selectedEdge, setSelectedEdge] = useState<any>(null);
    const [workflowId, setWorkflowId] = useState("");
    const { projectId } = useParams<{ projectId: string }>();
    const addNewNode = (type:string) => {
        const newNode = {
            id: Date.now().toString(),
            type: "workflowNode",
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500,
            },
            data: { label: type, nodeType:type },
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
    setNodes((nds) => nds.map((node) => node.id === selectedNode.id ? {...node, data: {...node.data,label,},}: node));
    setSelectedNode((prev: any) => prev ? { ...prev, data: { ...prev.data,label,},}: null);
    };

    const saveWorkflow = async() => {
      await updateWorkflow(workflowId, {
        nodes,
        edges,
      });
    }
    useEffect(() => {
      if (!projectId) return;

      const loadWorkflow = async () => {
        const response = await getWorkflow(projectId);

        setWorkflowId(response.workflow._id);
        setNodes(response.workflow.nodes);
        setEdges(response.workflow.edges);
      };

      loadWorkflow();
    }, [projectId]);   
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
        <Toolbar addNode={addNewNode} />
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