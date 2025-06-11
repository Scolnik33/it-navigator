import { getNotifications } from "@/services/notification";
import { Notification } from "@prisma/client";
import { create } from "zustand";

interface useNotificationProps {
  loading: boolean;
  errors: boolean;
  notification: Notification[];
  getNotification: (userId: number) => Promise<void>;
}

export const useNotificationStore = create<useNotificationProps>((set) => ({
  notification: [],
  loading: false,
  errors: false,
  getNotification: async (userId) => {
    try {
      set({ loading: true, errors: false });
      const data = await getNotifications(userId);
      set({ notification: data });
    } catch (err) {
      console.log("Error fetching notification data:", err);
      set({ errors: true });
    } finally {
      set({ loading: false });
    }
  },
}));