import { getUserEvents } from "@/services/user-events";
import { Event } from "@prisma/client";
import { create } from "zustand";

interface UserEventsStoreProps {
    events: Event[];
    loading: boolean;
    error: boolean;
    getEvents: (id: number) => Promise<void>;
}

export const useUserEventsStore = create<UserEventsStoreProps>((set) => ({
    events: [],
    loading: true,
    error: false,
    getEvents: async (id) => {
        try {
            set({ loading: true });
            const data = await getUserEvents(id);
            set({ events: data });
        } catch (err) {
            console.log("SECTION GET USERS EVENTS ERROR: ", err);
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));