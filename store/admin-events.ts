import { getAdminEvents } from "@/services/admin-events";
import { Event } from "@prisma/client";
import { create } from "zustand";

interface AdminEventsStoreProps {
  adminEvents: Event[];
  getAdminEvents: () => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  error: boolean;
  loading: boolean;
  offset: number;
  hasMore: boolean;
}

export const useAdminEventsStore = create<AdminEventsStoreProps>(
  (set, get) => ({
    adminEvents: [],
    error: false,
    loading: false,
    offset: 0,
    hasMore: true,

    getAdminEvents: async () => {
      try {
        set({ loading: true, error: false });
        const data = await getAdminEvents(0);
        set({
          adminEvents: data,
          offset: data.length,
          hasMore: data.length === 6,
        });
      } catch (err) {
        console.log("Error fetching admin events data:", err);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },

    loadMoreEvents: async () => {
      const { offset, adminEvents, hasMore } = get();
      if (!hasMore) return;

      try {
        set({ loading: true });
        const data = await getAdminEvents(offset);
        set({
          adminEvents: [...adminEvents, ...data],
          offset: offset + data.length,
          hasMore: data.length === 6,
        });
      } catch (err) {
        console.log("LOAD MORE EVENTS ERROR: ", err);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },
  })
);
