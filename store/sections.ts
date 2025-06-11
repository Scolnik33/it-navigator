import { getCompanies, getEducation, getEvents } from "@/services/sections";
import { Company, Education, Event, STATUS } from "@prisma/client";
import { create } from "zustand";

export interface EventFilter {
  paid?: boolean;
  online?: boolean;
  offset?: number;
  status?: STATUS;
}

export interface SectionsState {
  loading: boolean;
  error: boolean;
  events: Event[];
  companies: Company[];
  education: Education[];
  offsetEvents: number;
  hasMoreEvents: boolean;
  offsetEducation: number;
  hasMoreEducation: boolean;
  getEvents: (filters?: EventFilter) => Promise<void>;
  loadMoreEvents: () => Promise<void>;
  getCompanies: () => Promise<void>;
  getEducation: () => Promise<void>;
  loadMoreEducation: () => Promise<void>;
}

export const useSectionsStore = create<SectionsState>((set, get) => ({
  events: [],
  companies: [],
  education: [],
  offsetEvents: 0,
  hasMoreEvents: true,
  offsetEducation: 0,
  hasMoreEducation: true,
  loading: true,
  error: false,

  getEvents: async (filters) => {
    try {
      set({
        loading: true,
        error: false,
        offsetEvents: 0,
        hasMoreEvents: true,
      });
      const data = await getEvents({
        ...filters,
        offset: 0,
      });
      set({
        events: data,
        offsetEvents: data.length,
        hasMoreEvents: data.length === 6,
      });
    } catch (err) {
      console.log("SECTION GET EVENTS ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreEvents: async () => {
    const { offsetEvents, events, hasMoreEvents } = get();
    if (!hasMoreEvents) return;

    try {
      set({ loading: true });
      const data = await getEvents({ offset: offsetEvents });
      set({
        events: [...events, ...data],
        offsetEvents: offsetEvents + data.length,
        hasMoreEvents: data.length > 6,
      });
    } catch (err) {
      console.log("LOAD MORE EVENTS ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  getCompanies: async () => {
    try {
      set({ loading: true, error: false });
      const data = await getCompanies();
      set({ companies: data });
    } catch (err) {
      console.log("SECTION GET COMPANIES ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  getEducation: async () => {
    try {
      set({
        loading: true,
        error: false,
        offsetEducation: 0,
        hasMoreEducation: true,
      });
      const data = await getEducation();
      set({
        education: data,
        offsetEducation: data.length,
        hasMoreEducation: data.length === 4,
      });
    } catch (err) {
      console.log("SECTION GET EDUCATION ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreEducation: async () => {
    const { offsetEducation, education, hasMoreEducation } = get();
    if (!hasMoreEducation) return;

    try {
      set({ loading: true, error: false });
      const data = await getEducation(offsetEducation);
      set({
        education: [...education, ...data],
        offsetEducation: offsetEducation + data.length,
        hasMoreEducation: data.length === 4,
      });
    } catch (err) {
      console.log("LOAD MORE EDUCATION ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));

useSectionsStore.getState().getEvents();
useSectionsStore.getState().getCompanies();
useSectionsStore.getState().getEducation();
