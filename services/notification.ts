import { instance } from "@/lib/api";
import { Notification } from "@prisma/client";

export const getNotifications = async (
  userId: number
): Promise<Notification[]> => {
  const { data } = await instance.get<Notification[]>("notification", {
    params: { userId },
  });

  return data;
};
