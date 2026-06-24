import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  projectId: string;
}

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  onStatusChange: (taskId: string,status: string) => void;
  onDelete: (taskId: string) => void;
}

const KanbanColumn = ({
  title,
  tasks,
  onStatusChange,
  onDelete,
}: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: title });
  return (
    <div ref={setNodeRef} className="bg-[#FAF6F0] border border-[#f0eadd] rounded-xl p-4 flex flex-col min-h-[500px]">
      <h3 className="text-sm font-serif font-medium uppercase tracking-widest text-[#111] mb-4 pb-2 border-b border-[#e6ded2]">
        {title} ({tasks.length})
      </h3>
      <div className="space-y-4 flex-1">

        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            columnStatus={title}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed border-[#e6ded2] rounded-lg flex items-center justify-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest">
              Empty
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;