import api from "../api/axios";

export const getDashboardStats = async () => {
    const response = await api.get("/dashnoard/stats");
    return response.data;
};