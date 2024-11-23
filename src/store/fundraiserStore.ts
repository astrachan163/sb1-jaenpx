import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FundraiserState {
  totalOrders: number;
  goalOrders: number;
  incrementOrders: () => void;
  resetOrders: () => void;
}

export const useFundraiserStore = create<FundraiserState>()(
  persist(
    (set) => ({
      totalOrders: 0,
      goalOrders: 100, // Target number of ornaments
      incrementOrders: () => set((state) => ({ totalOrders: state.totalOrders + 1 })),
      resetOrders: () => set({ totalOrders: 0 }),
    }),
    {
      name: 'fundraiser-storage',
    }
  )
);