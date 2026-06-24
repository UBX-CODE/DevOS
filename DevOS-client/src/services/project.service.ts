import api from "../api/axios";

export interface CreateProjectData {
  title: string;
  description: string;
}

export const getProjects = async () => {
  const response = await api.get(
    "/projects"
  );
  return response.data;
};

export const createProject =
  async (
    data: CreateProjectData
  ) => {
    const response =
      await api.post(
        "/projects",
        data
      );
    return response.data;
};

export const updateProject =
  async (
    projectId: string,
    data: Partial<CreateProjectData>
  ) => {
    const response =
      await api.put(
        `/projects/${projectId}`,
        data
      );
    return response.data;
};

export const deleteProject =
  async (
    projectId: string
  ) => {
    const response =
      await api.delete(
        `/projects/${projectId}`
      );
    return response.data;
};