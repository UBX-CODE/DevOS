import api from "../api/axios";

export const getGithubProfile = async () => {
    const response = await api.get("/github/profile");

    return response.data;
}

export const getGithubRepos = async () => {
    const response = await api.get("/github/repos");
    return response.data;
}