import { Notification } from "@prisma/client";
import { instance } from "./axios";

export const getNotifications = async (
  userId: number
): Promise<Notification[]> => {
  const { data } = await instance.get<Notification[]>("notification", {
    params: { userId },
  });

  return data;
};
