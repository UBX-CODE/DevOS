import { useEffect, useState } from "react";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

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

  const [editingId, setEditingId] =
    useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response =
        await getProjects();

      setProjects(
        response.projects
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteProject =
    async (
      projectId: string
    ) => {
      try {
        const confirmed =
          window.confirm(
            "Delete Project?"
          );

        if (!confirmed) return;

        await deleteProject(
          projectId
        );

        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    };

  const handleEditProject = (
    project: Project
  ) => {
    setEditingId(
      project._id
    );

    setTitle(
      project.title
    );

    setDescription(
      project.description
    );
  };

  const handleUpdateProject =
    async () => {
      try {
        if (!editingId) return;

        await updateProject(
          editingId,
          {
            title,
            description,
          }
        );

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
      <h1>
        Loading Projects...
      </h1>
    );
  }

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Projects
      </h1>

      <div className="mb-6 flex gap-2">

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="border p-2"
        />

        {editingId ? (
          <button
            onClick={
              handleUpdateProject
            }
            className="
              bg-blue-500
              text-white
              px-4
              rounded
            "
          >
            Update
          </button>
        ) : (
          <button
            onClick={
              handleCreateProject
            }
            className="
              bg-black
              text-white
              px-4
              rounded
            "
          >
            Create
          </button>
        )}

      </div>

      {projects.length === 0 ? (
        <p>
          No Projects Found
        </p>
      ) : (
        <div className="space-y-4">

          {projects.map(
            (project) => (
              <div
                key={project._id}
                className="
                  border
                  p-4
                  rounded
                "
              >

                <h2 className="text-xl font-bold">
                  {project.title}
                </h2>

                <p>
                  {
                    project.description
                  }
                </p>

                <div className="mt-3 flex gap-2">

                  <button
                    onClick={() =>
                      handleEditProject(
                        project
                      )
                    }
                    className="
                      bg-yellow-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteProject(
                        project._id
                      )
                    }
                    className="
                      bg-red-500
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}
    </div>
  );
}

export default ProjectsPage;