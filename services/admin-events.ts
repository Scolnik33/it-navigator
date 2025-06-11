import { Event } from "@prisma/client";
import { instanceAdmin } from "./axios";

export const getAdminEvents = async (offset: number): Promise<Event[]> => {
  const { data } = await instanceAdmin.get<Event[]>("events", {
    params: { offset },
  });

  return data;
};
