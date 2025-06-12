import { Company, Education, Event } from "@prisma/client";
import { EventFilter } from "@/store/sections";
import { instance } from "@/lib/api";

export const getEvents = async (filters?: EventFilter): Promise<Event[]> => {
  const { data } = await instance.get<Event[]>("events", { params: filters });

  return data;
};

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await instance.get<Company[]>("companies");

  return data;
};

export const getEducation = async (
  offsetEducation?: number
): Promise<Education[]> => {
  const { data } = await instance.get<Education[]>("education", {
    params: { offsetEducation },
  });

  return data;
};
