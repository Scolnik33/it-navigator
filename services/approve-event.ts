import { instanceAdmin } from "./axios";

export const approveEvent = async (id: number) => {
  await instanceAdmin.post("/approve", { id });
};
