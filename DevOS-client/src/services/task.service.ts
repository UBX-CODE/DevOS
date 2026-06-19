import api from "../api/axios";

export const getTasks = async () => {
  const response =
    await api.get("/tasks");

  return response.data;
};

export const createTask = async (
  data: any
) => {
  const response =
    await api.post(
      "/tasks",
      data
    );

  return response.data;
};

export const updateTask = async (
  taskId: string,
  data: any
) => {
  const response =
    await api.patch(
      `/tasks/${taskId}`,
      data
    );

  return response.data;
};

export const deleteTask = async (
  taskId: string
) => {
  const response =
    await api.delete(
      `/tasks/${taskId}`
    );

  return response.data;
};