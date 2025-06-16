"use client";

import { Button, Input, Label, Textarea } from "@/components/ui";
import React, { useEffect } from "react";
import { ChooseVariants, DatePicker } from "../..";
import { useForm } from "react-hook-form";
import { formAddEventSchema, TFormAddEventValues } from "./shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { CreateEvent } from "@/app/actions";
import toast from "react-hot-toast";
import { Asterisk } from "lucide-react";
import { Session } from "next-auth";
import { instance } from "@/services/axios";
import { Event } from "@prisma/client";
import { AddEventFormSkeleton } from "../skeleton/add-event-form-skeleton";

interface Props {
  closeBtnRef?: React.RefObject<HTMLButtonElement>;
  session?: Session | null;
  event?: Event | null;
  loading?: boolean;
}

export const AddEventForm: React.FC<Props> = ({
  closeBtnRef,
  session,
  event,
  loading,
}) => {
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<TFormAddEventValues>({
    resolver: zodResolver(formAddEventSchema),
    defaultValues: {
      title: "",
      image: null,
      company: "",
      description: "",
      userId: Number(session?.user.id) || 0,
      date: "01.01 - 10.01",
      paid: false,
      online: false,
      link: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        company: event.company,
        description: event.description,
        userId: Number(session?.user.id) || 0,
        date: event.date ?? "01.01 - 10.01",
        paid: event.paid ?? false,
        online: event.online ?? false,
        price: event.price ?? undefined,
        image: event.image ?? null,
        link: event.link ?? "",
      });
    }
  }, [event]);

  const onSubmit = async (data: TFormAddEventValues) => {
    try {
      const imageInput = document.getElementById("image") as HTMLInputElement;
      const file = imageInput?.files?.[0];

      let imageUrl = "";

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await instance.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadRes.status !== 200) {
          toast.error("Не удалось загрузить изображение");
          throw new Error("Не удалось загрузить изображение");
        }

        const json = uploadRes.data;
        imageUrl = json.url;
      }

      await CreateEvent({ ...data, image: imageUrl });

      toast.success(
        "Мероприятие успешно отправлено на подтверждение модераторам",
        {
          icon: "✅",
        }
      );
      closeBtnRef?.current?.click();
    } catch (err) {
      console.error("ERROR [CREATE EVENT]:", err);
      toast.error("Не удалось добавить мероприятие", {
        icon: "❌",
      });
    }
  };

  return (
    <>
      {loading ? (
        <AddEventFormSkeleton />
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex items-center mb-2 space-x-1">
              <Label htmlFor="title" className="font-semibold text-gray-700">
                Название
              </Label>
              <Asterisk color="#fb2c37" width={12} height={12} />
            </div>
            <Input
              id="title"
              type="text"
              className={`w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <div className="mb-2">
              <Label htmlFor="image" className="font-semibold text-gray-700">
                Картинка
              </Label>
            </div>
            <Input
              id="image"
              type="file"
              className="w-full cursor-pointer rounded border border-gray-300 p-1 text-sm text-gray-700 file:cursor-pointer file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-blue-700 file:hover:bg-blue-100"
            />
          </div>

          <div>
            <div className="flex items-center mb-2 space-x-1">
              <Label htmlFor="company" className="font-semibold text-gray-700">
                Компания
              </Label>
              <Asterisk color="#fb2c37" width={12} height={12} />
            </div>
            <Input
              id="company"
              type="text"
              className={`w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.company ? "border-red-500" : "border-gray-300"
              }`}
              {...register("company")}
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600">{errors.company.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2 space-x-1">
              <Label htmlFor="description" className="font-semibold text-gray-700">
                Описание
              </Label>
              <Asterisk color="#fb2c37" width={12} height={12} />
            </div>
            <Textarea
              id="description"
              className={`w-full resize-none rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-[190px] ${
                errors.description ? "border-red-500 max-h-[120px]" : "border-gray-300"
              }`}
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center mb-2 space-x-1">
              <Label htmlFor="company" className="font-semibold text-gray-700">
                Ссылка
              </Label>
              <Asterisk color="#fb2c37" width={12} height={12} />
            </div>
            <Input
              id="company"
              type="text"
              className={`w-full rounded-md border px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.link ? "border-red-500" : "border-gray-300"
              }`}
              {...register("link")}
            />
            {errors.link && (
              <p className="mt-1 text-sm text-red-600">{errors.link.message}</p>
            )}
          </div>

          <DatePicker
            value={event?.date}
            onChange={(value) =>
              setValue("date", value, { shouldValidate: true })
            }
          />
          <ChooseVariants
            initialOnline={event?.online}
            initialPaid={event?.paid}
            initialPrice={event?.price}
            className="flex flex-col space-y-2"
            onChangePaid={(value) => {
              setValue("paid", value);
              if (!value) unregister("price");
            }}
            onChangeOnline={(value) =>
              setValue("online", value, { shouldValidate: true })
            }
            onChangePrice={(value) =>
              setValue("price", value, { shouldValidate: true })
            }
          />
          <DialogFooter>
            <Button
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              variant={"default"}
            >
              {event ? "Обновить" : "Добавить"}
            </Button>
            <DialogClose asChild>
              <Button ref={closeBtnRef} type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      )}
    </>
  );
};
