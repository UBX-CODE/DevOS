import { useEffect, useState } from "react";
import { getProjects,createProject} from "../services/project.service";

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject =
  async () => {

    try {

      await createProject({
        title,
        description,
      });

      setTitle("");
      setDescription("");

      fetchProjects();

    } catch (error) {

      console.error(error);

    }
};

  const fetchProjects = async () => {
    try {
      const response = await getProjects();

      console.log("Projects Response:", response);

      setProjects(response.projects);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading Projects...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Projects
      </h1>
        <div className="mb-6">

  <input
    type="text"
    placeholder="Project Title"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
    className="border p-2 mr-2"
  />

  <input
    type="text"
    placeholder="Project Description"
    value={description}
    onChange={(e) =>
      setDescription(
        e.target.value
      )
    }
    className="border p-2 mr-2"
  />

  <button
    onClick={
      handleCreateProject
    }
    className="
      bg-black
      text-white
      px-4
      py-2
      rounded
    "
  >
    Create
  </button>

</div>
      {projects.length === 0 ? (
        <p>No Projects Found</p>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="border rounded-lg p-4 shadow"
            >
              <h2 className="text-xl font-semibold">
                {project.title}
              </h2>

              <p className="text-gray-600">
                {project.description}
              </p>

              <p className="mt-2">
                Status:
                {" "}
                {project.status || "ACTIVE"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;