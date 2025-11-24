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
      const url = "https://see-again-production.up.railway.app/api"
      const res = await axios.get(`${url}/users/me`);
      set({ user: res.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    const url = "https://see-again-production.up.railway.app/api"
    await axios.post(`${url}/users/logout`);
    set({ user: null });
  },
}));