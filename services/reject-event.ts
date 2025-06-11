import { instanceAdmin } from "./axios";

export const rejectEvent = async (
  id: number,
  data: { reason: string; comment?: string | undefined }
) => {
  await instanceAdmin.post("/reject", { id, ...data });
};
