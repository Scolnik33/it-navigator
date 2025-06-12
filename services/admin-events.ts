import { instanceAdmin } from "@/lib/api";
import { Event } from "@prisma/client";

export const getAdminEvents = async (offset: number): Promise<Event[]> => {
  const { data } = await instanceAdmin.get<Event[]>("events", {
    params: { offset },
  });

  return data;
};
