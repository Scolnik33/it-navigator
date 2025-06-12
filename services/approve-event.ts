import { instanceAdmin } from "@/lib/api";

export const approveEvent = async (id: number) => {
  await instanceAdmin.post("/approve", { id });
};
