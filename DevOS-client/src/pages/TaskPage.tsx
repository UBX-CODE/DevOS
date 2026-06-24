import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/task.service";
import { getProjects } from "../services/project.service";
import { FiCheckSquare, FiPlus} from "react-icons/fi";
import KanbanColumn from "../components/KanbanColumn";
import {DndContext,type DragEndEvent} from "@dnd-kit/core";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  projectId: string;
}

interface Project {
  _id: string;
  title: string;
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await createTask({ title, description, projectId, priority });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (taskId: string, status: string) => {
    try {
      await updateTask(taskId, { status });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
  const { active, over } = event;
  if (!over) return;
  const taskId = active.id.toString();
  const newStatus = over.id.toString();
  try {
    await updateTask(taskId,{status: newStatus,});
    fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#111] rounded-full animate-spin"></div>
      </div>
    );
  }
const todoTasks = tasks.filter(
  (task) => task.status === "TODO"
);

const progressTasks = tasks.filter(
  (task) => task.status === "IN_PROGRESS"
);

const doneTasks = tasks.filter(
  (task) => task.status === "DONE"
);

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center gap-3 mb-8">
        <FiCheckSquare size={28} className="text-[#111]" />
        <h1 className="text-3xl font-serif tracking-tight text-[#111]">Tasks</h1>
      </div>

      <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8 mb-10">
        <h2 className="text-lg font-serif font-medium mb-6 flex items-center gap-2 text-[#111]">
          <FiPlus /> New Task
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
          />
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>{project.title}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="md:col-span-2 w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
          />
          <div className="flex gap-4">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex-1 bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            >
              <option>LOW</option>
              <option>MEDIUM</option>
              <option>HIGH</option>
              <option>CRITICAL</option>
            </select>
            <button
              onClick={handleCreateTask}
              className="bg-[#1f1e1e] text-white px-8 py-3 rounded text-xs tracking-widest font-semibold hover:bg-black transition whitespace-nowrap"
            >
              CREATE
            </button>
          </div>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <KanbanColumn 
        title="TODO"
        tasks={todoTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        />

        <KanbanColumn
        title="IN_PROGRESS"
        tasks={progressTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        />

        <KanbanColumn
        title="DONE"
        tasks={doneTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        />
        </div>
      </DndContext>
    </div>
  );
}

export default TasksPage;