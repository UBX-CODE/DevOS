import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";

interface Project {
  _id: string;
  title: string;
  description: string;
  status?: string;
}

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

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