import { useEffect, useState } from "react";
import { getProjects, createProject, updateProject, deleteProject } from "../services/project.service";
import { FiEdit2, FiTrash2, FiFolderPlus, FiFolder } from "react-icons/fi";

interface Project {
  _id: string;
  title: string;
  description: string;
  status?: string;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      await createProject({ title, description });
      setTitle("");
      setDescription("");
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const confirmed = window.confirm("Delete Project?");
      if (!confirmed) return;
      await deleteProject(projectId);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setDescription(project.description);
  };

  const handleUpdateProject = async () => {
    try {
      if (!editingId) return;
      await updateProject(editingId, { title, description });
      setEditingId(null);
      setTitle("");
      setDescription("");
      fetchProjects();
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

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center gap-3 mb-8">
        <FiFolder size={28} className="text-[#111]" />
        <h1 className="text-3xl font-serif tracking-tight text-[#111]">Projects</h1>
      </div>

      <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8 mb-10">
        <h2 className="text-lg font-serif font-medium mb-6 flex items-center gap-2 text-[#111]">
          <FiFolderPlus /> {editingId ? "Edit Project" : "New Project"}
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="flex-[2] bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
          />
          {editingId ? (
            <button onClick={handleUpdateProject} className="bg-[#1f1e1e] text-white px-8 py-3 rounded text-xs tracking-widest font-semibold hover:bg-black transition whitespace-nowrap">
              UPDATE
            </button>
          ) : (
            <button onClick={handleCreateProject} className="bg-[#1f1e1e] text-white px-8 py-3 rounded text-xs tracking-widest font-semibold hover:bg-black transition whitespace-nowrap">
              CREATE
            </button>
          )}
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#f0eadd] rounded-xl shadow-sm">
          <p className="text-gray-500 font-light">No Projects Found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="bg-white border border-[#f0eadd] p-6 rounded-xl shadow-sm flex flex-col justify-between group hover:border-gray-300 transition">
              <div>
                <h2 className="text-xl font-serif font-medium text-[#111] mb-2">{project.title}</h2>
                <p className="text-[15px] text-gray-500 font-light mb-6 line-clamp-3">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditProject(project)}
                  className="flex items-center gap-2 bg-[#FAF6F0] border border-[#f0eadd] text-[#111] px-4 py-2 rounded text-sm hover:bg-[#e6ded2] transition"
                >
                  <FiEdit2 size={14}/> Edit
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="flex items-center gap-2 bg-[#FAF6F0] border border-[#f0eadd] text-red-600 px-4 py-2 rounded text-sm hover:bg-red-50 transition"
                >
                  <FiTrash2 size={14}/> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;