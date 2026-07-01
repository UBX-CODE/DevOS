import api from "../api/axios";

export const createWorkflow = async (data:any) => {
    const response = await api.post("/workflows", data);
    return response.data;
};

export const getWorkflow = async (projectId: string) => {
    const response = await api.get (`/workflows/${projectId}`);
    return response.data;
}

export const updateWorkflow = async (workflowId: string, data:any) => {
    const response = await api.put(`/workflows/${workflowId}`, data);
    return response.data;
}

export const deleteWorkflow = async (workflowId:string) => {
    const response = await api.delete(`/workflows/${workflowId}`);
    return response.data;
};