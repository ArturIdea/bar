import { create } from 'zustand';

interface BankFilterStore {
  selectedBank: string | null;
  setSelectedBank: (bank: string | null) => void;
}

export const useBankFilterStore = create<BankFilterStore>((set) => ({
  selectedBank: null,
  setSelectedBank: (bank) => set({ selectedBank: bank }),
})); 