import {useEffect,useState,} from "react";

import {getTasks,createTask,updateTask,deleteTask,} from "../services/task.service";
import {getProjects} from "../services/project.service";

interface Task {
  _id: string;
  title: string;
  description: string;
  status:| "TODO"| "IN_PROGRESS"| "DONE";
  priority: "LOW"| "MEDIUM"| "HIGH"| "CRITICAL";
  projectId: string;
}

interface Project{
    _id: string;
    title: string;
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");

  const [description,setDescription] = useState("");

  const [projectId,setProjectId] = useState("");

  const [priority,setPriority] = useState("MEDIUM");

  const [projects,setProjects] = useState<Project[]>([]);

  useEffect(() => {fetchTasks(); fetchProjects();},[]);

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
        try{
            const response = await getProjects();
            setProjects(response.projects);
        }catch(error){
            console.error(error);
        }
    };
  const handleCreateTask =
    async () => {
      try {
        await createTask({title,description,projectId,priority,});
        setTitle("");
        setDescription("");
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    };
  const handleStatusChange = async (
      taskId: string,
      status: string
    ) => {
      try {
        await updateTask(taskId,{ status });
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDelete =
    async (
      taskId: string
    ) => {
      try {
        await deleteTask(
          taskId
        );
        fetchTasks();
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Tasks
      </h1>
      <div className="space-y-2 mb-8">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          className="border p-2 w-full"
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
          className="border p-2 w-full"
        />

        <select
  value={projectId}
  onChange={(e) =>
    setProjectId(
      e.target.value
    )
  }
  className="border p-2 w-full"
>

  <option value="">
    Select Project
  </option>

  {projects.map(
    (project) => (

      <option
        key={project._id}
        value={project._id}
      >
        {project.title}
      </option>

    )
  )}

</select>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value
            )
          }
          className="border p-2"
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
          <option>CRITICAL</option>
        </select>

        <button
          onClick={
            handleCreateTask
          }
          className="bg-black text-white px-4 py-2 rounded"
        >
          Create Task
        </button>

      </div>

      {tasks.map((task) => (
        <div key={task._id} className="border p-4 rounded mb-3">

          <h2 className="font-bold">
            {task.title}
          </h2>

          <p>
            {task.description}
          </p>
          <p>
            Status:{" "}{task.status}
          </p>
          <p>
            Priority:{" "}{task.priority}
          </p>

          <div className="flex gap-2 mt-3">

            <button
              onClick={() =>
                handleStatusChange(
                  task._id,
                  "DONE"
                )
              }
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Done
            </button>

            <button
              onClick={() =>
                handleDelete(
                  task._id
                )
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>

          </div>

        </div>
      ))}
    </div>
  );
}

export default TasksPage;