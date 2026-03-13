import { create } from "zustand";

interface NotificationStore {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  increment: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,
  setUnreadCount: (count) => set({ unreadCount: count }),
  increment: () => set((s) => ({ unreadCount: s.unreadCount + 1 })),
  clearAll: () => set({ unreadCount: 0 }),
}));
