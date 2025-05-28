import { create } from "zustand";

interface AppStateStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// Zustand store for managing application state
export const useAppStateStore = create<AppStateStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
}));
