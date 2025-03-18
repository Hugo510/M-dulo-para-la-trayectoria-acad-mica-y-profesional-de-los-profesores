import { create } from "zustand";
import { userService } from "../services/userService";

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  // ...otros campos del perfil...
}

interface UserState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile) => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  loading: false,
  error: null,
  setProfile: (profile) => set({ profile }),
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await userService.getProfile();
      set({ profile: response.data, loading: false });
    } catch (error: any) {
      console.error("Error al cargar el perfil", error);
      set({
        error: error.message || "Error al cargar el perfil",
        loading: false,
      });
    }
  },
  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await userService.updateProfile(data);
      set({ profile: response.data, loading: false });
    } catch (error: any) {
      console.error("Error al actualizar el perfil", error);
      set({
        error: error.message || "Error al actualizar el perfil",
        loading: false,
      });
      throw error;
    }
  },
}));
