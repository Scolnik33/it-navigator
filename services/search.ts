import { Event } from "@prisma/client";
import { instance } from "./axios";

export const search = async (query: string): Promise<Event[]> => {
  const { data } = await instance.get<Event[]>("/search", { params: { query } });

  return data;
};
