"use client";

import React, { useState } from "react";
import { Title } from "../title";
import { Event } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EventsItemModal } from "./events-item-modal";
import { EventItemRejectModal } from "./event-item-reject-modal";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { instance } from "@/services/axios";
import { EventFilter } from "@/store/sections";
import { usePathname } from "next/navigation";

export const EventsItem: React.FC<
  Event & {
    getEvents?: (eventFilter?: EventFilter) => Promise<void>;
  }
> = ({ id, title, image, description, date, paid, online, getEvents }) => {
  const [isRejectModal, setIsRejectModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleDelete = async () => {
    try {
      await instance.delete(`/events/delete/${id}`);
      await getEvents?.();
      toast.success("Мероприятие успешно удалено", {
        icon: "✅",
      });
    } catch (err) {
      console.log("Error deleting event:", err);
      toast.error("Не удалось удалить мероприятие", {
        icon: "❌",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div
        className="relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-2xl w-full max-w-sm transition-shadow duration-300 hover:shadow-2xl hover:cursor-pointer"
        onMouseEnter={() => setIsDelete(true)}
        onMouseLeave={() => setIsDelete(false)}
      >
        <DialogTrigger asChild>
          <div onClick={() => setIsOpen(true)}>
            <img
              className="w-full max-h-[214px] h-[172px] object-cover object-center rounded-t-2xl"
              src={image ?? "/images/block-without-image.webp"}
              alt={title}
            />
            {pathname !== "/admin/event-moderation" &&
              session?.user.role === "ADMIN" &&
              isDelete && (
                <Trash2
                  width={20}
                  height={20}
                  className="text-red-500 absolute top-3 right-3 hover:text-red-600 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                />
              )}
            <div className="p-4 w-full">
              <Title
                className="font-bold"
                text={title.length > 25 ? title.slice(0, 25) + "..." : title}
                size="sm"
              />
              <p className="text-slate-600 leading-relaxed font-light min-h-[120px] mt-2">
                {description.length > 200
                  ? description.slice(0, 200) + "..."
                  : description}
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
              <div className="flex space-x-2 text-[12px] sm:text-sm font-medium">
                <span
                  className={cn({
                    "text-green-600": !paid,
                    "text-slate-600": paid,
                  })}
                >
                  {paid ? "Платно" : "Бесплатно"}
                </span>
                <span className="w-px h-5 bg-slate-300" />
                <span
                  className={cn({
                    "text-green-600": online,
                    "text-slate-600": !online,
                  })}
                >
                  {online ? "Онлайн" : "Оффлайн"}
                </span>
              </div>
              <div className="text-[11px] sm:text-base text-slate-600 font-medium">
                {date}
              </div>
            </div>
          </div>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-4xl">
        {isRejectModal ? (
          <EventItemRejectModal
            id={id}
            setIsRejectModal={setIsRejectModal}
            setIsOpen={setIsOpen}
          />
        ) : (
          <EventsItemModal
            id={id}
            setIsRejectModal={setIsRejectModal}
            setIsOpen={setIsOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
