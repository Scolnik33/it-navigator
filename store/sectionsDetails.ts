import {
  getOneCompany,
  getOneEducation,
  getOneEvent,
} from "@/services/sectionsDetails";
import { Company, Education, Event } from "@prisma/client";
import { create } from "zustand";

export interface SectionsDetailsState {
  loading: boolean;
  error: boolean;
  event: Event | null;
  company: Company | null;
  education: Education | null;
  getEvent: (id: number) => Promise<void>;
  getCompany: (id: number) => Promise<void>;
  getEducation: (id: number) => Promise<void>;
}

export const useSectionsDetailsStore = create<SectionsDetailsState>((set) => ({
  loading: true,
  error: false,
  event: null,
  company: null,
  education: null,

  getEvent: async (id) => {
    try {
      set({ loading: true });
      const data = await getOneEvent(id);
      set({ event: data });
    } catch (err) {
      console.log("SECTIONDETAILS GET EVENT ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  getCompany: async (id) => {
    try {
      set({ loading: true });
      const data = await getOneCompany(id);
      set({ company: data });
    } catch (err) {
      console.log("SECTIONDETAILS GET COMPANY ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  getEducation: async (id) => {
    try {
      set({ loading: true });
      const data = await getOneEducation(id);
      set({ education: data });
    } catch (err) {
      console.log("SECTIONDETAILS GET EDUCATION ERROR: ", err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));