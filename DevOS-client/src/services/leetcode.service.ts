import api from "../api/axios";

export const getLeetcodeProfile =
  async () => {
    const response =
      await api.get( "/leetcode/profile" );
    return response.data;
};