import { create } from 'zustand';

interface AppTypeFilterStore {
  selectedAppType: string | null;
  setSelectedAppType: (appType: string | null) => void;
}

export const useAppTypeFilterStore = create<AppTypeFilterStore>((set) => ({
  selectedAppType: null,
  setSelectedAppType: (appType) => set({ selectedAppType: appType }),
})); 