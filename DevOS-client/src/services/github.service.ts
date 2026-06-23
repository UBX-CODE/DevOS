import api from "../api/axios";

export const getGithubProfile = async () => {
    const response = await api.get("/github/profile");
    
    return response.data;
}