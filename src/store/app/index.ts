import { create } from 'zustand';

interface AppState {
  drawerStatus: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useApp = create<AppState>((set, get) => ({
  drawerStatus: false,
  openDrawer: () => {
    set({ drawerStatus: true });
  },
  closeDrawer: () => {
    set({ drawerStatus: false });
  },
  toggleDrawer: () => {
    set({ drawerStatus: !get().drawerStatus });
  },
}));

export const openDrawer = () => useApp.getState().openDrawer();
export const closeDrawer = () => useApp.getState().closeDrawer();
export const toggleDrawer = () => useApp.getState().toggleDrawer();
