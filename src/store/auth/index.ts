//import { removeItem, removeToken } from "@/storage";
import { create } from 'zustand';
//import { setToken, setItem } from "@/storage";

interface AuthState {
  token: string | null;
  status: 'signOut' | 'signIn';
  login: () => void;
  logOut: () => void;
}

export const useAuth = create<AuthState>(() => ({
  status: 'signIn',
  token: null,
  login: () => {
    set({ status: 'signIn' });
  },
  logOut: () => {
    set({ status: 'signOut' });
  },
}));

// login
export const login = () => {
  return useAuth.getState().login();
};

// login
export const logOut = () => {
  return useAuth.getState().logOut();
};
