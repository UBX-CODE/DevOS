import {
    FiCheckSquare,
    FiGlobe,
    FiDatabase,
    FiGitBranch
} from "react-icons/fi";

interface ToolbarProps {
    addNode: (type: string) => void;
}

function Toolbar({ addNode }: ToolbarProps) {

    const items = [
        {
            label: "Task",
            type: "task",
            icon: <FiCheckSquare />
        },
        {
            label: "API",
            type: "api",
            icon: <FiGlobe />
        },
        {
            label: "Database",
            type: "database",
            icon: <FiDatabase />
        },
        {
            label: "Decision",
            type: "decision",
            icon: <FiGitBranch />
        }
    ];

    return (
        <div className="absolute top-4 left-4 z-10 flex gap-3">
            {
                items.map(item => (
                    <button
                        key={item.type}
                        onClick={() => addNode(item.type)}
                        className="flex items-center gap-2 bg-white border rounded-lg px-4 py-2 shadow hover:bg-gray-50"
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))
            }
        </div>
    );
}

export default Toolbar;