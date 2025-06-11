import { Company, Education, Event } from "@prisma/client";
import { instance } from "./axios";

export const getOneEvent = async (id: number): Promise<Event> => {
  const { data } = await instance.get<Event>(`events/${id}`);

  return data;
};

export const getOneCompany = async (id: number): Promise<Company> => {
  const { data } = await instance.get<Company>(`companies/${id}`);

  return data;
};

export const getOneEducation = async (id: number): Promise<Education> => {
  const { data } = await instance.get<Education>(`education/${id}`);

  return data;
};
