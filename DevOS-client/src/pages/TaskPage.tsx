import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/task.service";
import { getProjects } from "../services/project.service";
import { FiCheckSquare, FiPlus, FiCheckCircle, FiTrash2 } from "react-icons/fi";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#111] rounded-full animate-spin"></div>
      </div>
    );
  }

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "CRITICAL": return "text-red-600 bg-red-50 border-red-200";
      case "HIGH": return "text-orange-600 bg-orange-50 border-orange-200";
      case "MEDIUM": return "text-blue-600 bg-blue-50 border-blue-200";
      case "LOW": return "text-gray-600 bg-gray-100 border-gray-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simple Kanban Layout */}
        {["TODO", "IN_PROGRESS", "DONE"].map((columnStatus) => (
          <div key={columnStatus} className="bg-[#FAF6F0] border border-[#f0eadd] rounded-xl p-4 flex flex-col h-full min-h-[500px]">
            <h3 className="text-sm font-serif font-medium uppercase tracking-widest text-[#111] mb-4 pb-2 border-b border-[#e6ded2]">
              {columnStatus.replace("_", " ")}
            </h3>
            <div className="space-y-4 flex-1">
              {tasks.filter(t => t.status === columnStatus).map((task) => (
                <div key={task._id} className="bg-white border border-[#f0eadd] p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif font-medium text-[#111] leading-tight pr-4">{task.title}</h4>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 font-light mb-4 line-clamp-2 leading-relaxed">{task.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto border-t border-[#f0eadd] pt-3">
                    <div className="flex gap-2">
                      {columnStatus !== "DONE" && (
                        <button
                          onClick={() => handleStatusChange(task._id, columnStatus === "TODO" ? "IN_PROGRESS" : "DONE")}
                          className="flex items-center gap-1 text-[12px] font-medium text-gray-600 hover:text-black transition"
                        >
                          <FiCheckCircle size={14}/> Advance
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-400 hover:text-red-600 transition"
                    >
                      <FiTrash2 size={16}/>
                    </button>
                  </div>
                </div>
              ))}
              {tasks.filter(t => t.status === columnStatus).length === 0 && (
                <div className="h-24 border-2 border-dashed border-[#e6ded2] rounded-lg flex items-center justify-center">
                  <p className="text-xs text-gray-400 uppercase tracking-widest">Empty</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TasksPage;