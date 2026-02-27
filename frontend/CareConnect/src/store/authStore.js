import { create } from "zustand";
import { loginRequest } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,

  login: async (credentials) => {
    try {
      set({ loading: true });

      const data = await loginRequest(credentials);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });

      localStorage.setItem("token", data.token);

      return { success: true };
    } catch (error) {
      set({ loading: false });
      return { success: false, error };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
