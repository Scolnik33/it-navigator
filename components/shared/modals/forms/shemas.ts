import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Пароль должен состоять минимум из 8 символов" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Некоректная почта" }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(1, { message: "Некоректное имя" }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const formAddEventSchema = z.object({
  title: z.string().min(1, { message: "Некоректное название" }),
  image: z.string().optional().nullable(),
  company: z.string().min(1, { message: "Некоректное название компании" }),
  description: z
    .string()
    .min(1, { message: "Некоректное описание" })
    .max(1500, {
      message: "Максимальное количество символов не должно превышать 1500",
    }),
  userId: z.number(),
  date: z.string(),
  paid: z.boolean(),
  price: z.union([
    z.number().min(0, "Число не должно быть отрицательным"),
    z.undefined(),
  ]),
  online: z.boolean(),
  link: z.string().min(1, { message: "Некоректная ссылка" }),
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormAddEventValues = z.infer<typeof formAddEventSchema>;
