import { z } from "zod";

export const rejectEventSchema = z.object({
  reason: z.string().nonempty("Выберите причину отклонения"),
  comment: z.string().optional(),
});

export type TRejectEvent = z.infer<typeof rejectEventSchema>;