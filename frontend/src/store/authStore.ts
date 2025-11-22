import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;

export interface User {
  id: string | null
  firstName: string
  lastName: string
  email: string
}
interface AuthState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me");
      set({ user: res.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    await axios.post("http://localhost:5000/api/users/logout");
    set({ user: null });
  },
}));