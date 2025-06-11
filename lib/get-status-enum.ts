import { STATUS } from "@prisma/client";

export const getStatusEnum = (value: string | null): STATUS => {
  return Object.values(STATUS).includes(value as STATUS)
    ? (value as STATUS)
    : STATUS.WAITING;
};
