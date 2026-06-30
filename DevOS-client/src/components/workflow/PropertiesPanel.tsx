interface PropertiesPanelProps {
  selectedNode?: any;
  selectedEdge?: any;
  onLabelChange: (label: string) => void;
  onDeleteNode: () => void;
  onDeleteEdge: () => void;
}

function PropertiesPanel({ selectedNode, selectedEdge, onLabelChange, onDeleteNode, onDeleteEdge }: PropertiesPanelProps) {
  if (!selectedNode && !selectedEdge) return null;

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 p-6 flex flex-col gap-4 shadow-sm z-10">
      <h2 className="text-xl font-semibold mb-4 text-[#111] font-serif">
        {selectedNode ? "Node Properties" : "Connection"}
      </h2>

      {selectedNode && (
        <>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Node Label
            </label>
            <input
              value={selectedNode.data.label}
              onChange={(e) => onLabelChange(e.target.value)}
              className="w-full border border-gray-300 focus:border-[#111] focus:ring-1 focus:ring-[#111] rounded-lg px-3 py-2 outline-none transition"
            />
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-2"><span className="font-semibold">Node ID:</span> {selectedNode.id}</p>
            <p className="text-xs text-gray-500"><span className="font-semibold">Type:</span> {selectedNode.type}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={onDeleteNode}
              className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-2 px-4 rounded-lg transition text-sm font-medium"
            >
              Delete Node
            </button>
          </div>
        </>
      )}

      {selectedEdge && (
        <>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
            <p className="text-xs text-gray-500 mb-2"><span className="font-semibold">Source ID:</span> {selectedEdge.source}</p>
            <p className="text-xs text-gray-500"><span className="font-semibold">Target ID:</span> {selectedEdge.target}</p>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={onDeleteEdge}
              className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 py-2 px-4 rounded-lg transition text-sm font-medium"
            >
              Delete Connection
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PropertiesPanel;