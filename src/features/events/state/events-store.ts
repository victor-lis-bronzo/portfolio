import { create } from "zustand";

interface EventsState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useEventsStore = create<EventsState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

