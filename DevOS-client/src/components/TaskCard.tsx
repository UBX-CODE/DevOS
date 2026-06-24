import { FiCheckCircle, FiTrash2 } from "react-icons/fi";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  projectId: string;
}

interface TaskCardProps {
  task: Task;
  columnStatus: string;
  onStatusChange: (taskId: string, status: string) => void;
  onDelete: (taskId: string) => void;}

const getPriorityColor = (
  priority: string
) => {
  switch (priority) {
    case "CRITICAL":
      return "text-red-600 bg-red-50 border-red-200";
    case "HIGH":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "MEDIUM":
      return "text-blue-600 bg-blue-50 border-blue-200";
    default:
      return "text-gray-600 bg-gray-100 border-gray-200";
  }
};

const TaskCard = ({
  task,
  columnStatus,
  onStatusChange,
  onDelete,
}: TaskCardProps) => {
  const { setNodeRef,attributes, listeners, transform} =
    useDraggable({id: task._id});  
    const style = {
      transform:CSS.Translate.toString(transform),
    };
  return (
    <div ref={setNodeRef}{...listeners}{...attributes} style={style} className="bg-white border border-[#f0eadd] p-4 rounded-lg shadow-sm">

      <div className="flex justify-between items-start mb-2">

        <h4 className="font-serif font-medium text-[#111]">
          {task.title}
        </h4>

        <span
          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority}
        </span>

      </div>
      <p className="text-[13px] text-gray-500 mb-4">
        {task.description}
      </p>
      <div className="flex justify-between items-center pt-3 border-t border-[#f0eadd]">
        {columnStatus !== "DONE" && (
          <button
            onClick={() => onStatusChange(
                task._id,
                columnStatus === "TODO" ? "IN_PROGRESS": "DONE")}
            className="flex items-center gap-1 text-[12px] font-medium text-gray-600 hover:text-black"
          >
            <FiCheckCircle size={14} />
            Advance
          </button>
        )}
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-400 hover:text-red-600"
        >
          <FiTrash2 size={16} />
        </button>

      </div>
    </div>
  );
};

export default TaskCard;