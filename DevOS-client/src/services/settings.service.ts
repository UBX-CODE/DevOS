import api from "../api/axios";

export const updateProfile = async (
  data: {
    name: string;
    githubUsername: string;
    leetcodeUsername: string;
  }
) => {
  const response = await api.put("/auth/profile", data);
  return response.data;
};

export const getProfile = async() => {
  const response = await api.get("/auth/me");
  return response.data;
}