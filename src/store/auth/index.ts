//import { removeItem, removeToken } from "@/storage";
import { create } from 'zustand';
//import { setToken, setItem } from "@/storage";

interface AuthState {
  token: string | null;
  status: 'signOut' | 'signIn';
}

export const useAuth = create<AuthState>(() => ({
  status: 'signIn',
  token: null,
}));
