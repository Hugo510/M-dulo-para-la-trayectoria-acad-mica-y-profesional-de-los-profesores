import { create } from "zustand";
import { User } from "../types";
import { authService } from "../services/authService";

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    date_of_birth?: string;
  }) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
  login: async (email, password) => {
    const response = await authService.login(email, password);
    set({ user: response.data.teacher, token: response.data.token });
  },
  register: async (data) => {
    const response = await authService.register(data);
    // Se actualiza el estado con el usuario completo (todos los campos de User)
    set({ user: response.data.user, token: null });
  },
}));
