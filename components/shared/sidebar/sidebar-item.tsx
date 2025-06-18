"use client";

import React, { useState } from "react";
import { BellDot, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Event, Notification } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button } from "../../ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEventForm } from "../modals/forms";
import toast from "react-hot-toast";
import { instance } from "@/services/axios";
import { Title } from "../title";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useCloseButtonRef } from "@/hooks/useCloseButtonRef";

export const SidebarItem: React.FC<
  Notification & {
    getNotification: (userId: number) => Promise<void>;
  }
> = ({ id, title, body, eventId, createdAt, getNotification }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAnimateDelete, setIsAnimateDelete] = useState(false);
  const closeBtnRef = useCloseButtonRef();
  const { data: session } = useSession();

  const handleNotification = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/events/${eventId}`);
      setEvent(data);
    } catch (err) {
      console.log("Error fetching one notification data on frontend:", err);
      toast.error("Не удалось получить уведомление", {
        icon: "❌",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsAnimateDelete(true);
      setTimeout(() => {
        setIsDeleted(true);
      }, 500);
      await instance.delete(`/notification/delete/${id}`);
      if (session) {
        getNotification(Number(session.user.id));
      }
      toast.success("Уведомление успешно удалено", {
        icon: "✅",
      });
    } catch (err) {
      console.log("Error deleting notification frontend:", err);
      toast.error("Не удалось удалить уведомление", {
        icon: "❌",
      });
    }
  };

  return (
    !isDeleted && (
      <motion.div
        className={cn(
          "w-full rounded-md border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white space-y-2"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ x: 0 }}
        animate={{ x: isAnimateDelete ? 1000 : 0 }}
        transition={{ duration: 2, type: "spring" }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellDot className="text-blue-500" size={20} />
            <h3 className="font-semibold text-sm text-slate-800">{title}</h3>
          </div>
          <span className="text-xs text-slate-500">
            {format(new Date(createdAt), "d MMM yyyy, HH:mm", { locale: ru })}
          </span>
        </div>
        {body && (
          <div className="text-sm text-slate-600 leading-snug">
            {body.slice(0, 200).length >= 200 && !isOpen
              ? body.slice(0, 200) + "..."
              : body}
          </div>
        )}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            {(isOpen || body!.length < 200) && (
              <Dialog
                onOpenChange={(open) => {
                  if (open) {
                    handleNotification();
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant={"default"}>К мероприятию</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[75vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      <Title
                        className="font-bold text-blue-500"
                        text="Изменить мероприятие"
                        size="md"
                      />
                    </DialogTitle>
                  </DialogHeader>

                  <AddEventForm
                    event={event}
                    loading={loading}
                    session={session}
                    closeBtnRef={closeBtnRef}
                  />
                </DialogContent>
              </Dialog>
            )}
            {body!.length > 200 && (
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="link"
                size={"sm"}
                className="p-0"
              >
                {isOpen ? "Скрыть" : "Читать полностью"}
              </Button>
            )}
          </div>
          {isHovered && (
            <Trash2
              onClick={handleDelete}
              className="cursor-pointer hover:text-blue-500"
              width={20}
              height={20}
            />
          )}
        </div>
      </motion.div>
    )
  );
};

// СДЕЛАТЬ ВЫБОР УВЕДОМЛЕНИЙ И ИХ УДАЛЕНИЕ
