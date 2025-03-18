import axiosInstance from "./axiosInstance";

const USER_API_URL = import.meta.env.VITE_API_USER_URL || "/teachers";

export const userService = {
  getProfile: () => {
    return axiosInstance.get(`${USER_API_URL}`);
  },
  updateProfile: (data: {
    first_name?: string;
    last_name?: string;
    email?: string;
    // ...otros campos del perfil...
  }) => {
    return axiosInstance.put(`${USER_API_URL}/`, data);
  },
};
