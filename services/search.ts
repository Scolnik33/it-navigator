import { instance } from "@/lib/api";
import { Event } from "@prisma/client";

export const search = async (query: string): Promise<Event[]> => {
  const { data } = await instance.get<Event[]>("/search", { params: { query } });

  return data;
};
