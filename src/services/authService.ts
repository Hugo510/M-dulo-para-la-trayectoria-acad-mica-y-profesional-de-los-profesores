import axiosInstance from "./axiosInstance";

const API_URL = import.meta.env.VITE_API_AUTH_URL || "/auth";

// ...otras configuraciones o imports si fuese necesario...

export const authService = {
  login: (email: string, password: string) => {
    return axiosInstance.post(`${API_URL}/login`, { email, password });
  },
  register: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
  }) => {
    return axiosInstance.post(`${API_URL}/register`, data);
  },
  // ...otros métodos de autenticación si son necesarios...
};
