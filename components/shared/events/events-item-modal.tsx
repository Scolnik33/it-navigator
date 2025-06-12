"use client";

import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Title } from "..";
import { Button } from "@/components/ui";
import { useSectionsDetailsStore } from "@/store/sectionsDetails";
import {
  Building,
  CalendarDays,
  DollarSign,
  Link as LinkIcon,
  Wifi,
} from "lucide-react";
import { EventsItemModalSkeleton } from "./skeleton/events-item-modal-skeleton";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { approveEvent } from "@/services/approve-event";
import { useAdminEventsStore } from "@/store/admin-events";
import Link from "next/link";

interface Props {
  id: number;
  setIsRejectModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EventsItemModal: React.FC<Props> = ({
  id,
  setIsRejectModal,
  setIsOpen,
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const event = useSectionsDetailsStore((state) => state.event);
  const getEvent = useSectionsDetailsStore((state) => state.getEvent);
  const getAdminEvents = useAdminEventsStore((state) => state.getAdminEvents);
  const loading = useSectionsDetailsStore((state) => state.loading);
  const pathname = usePathname();

  useEffect(() => {
    try {
      getEvent(id);
    } catch (err) {
      console.log("ERROR [GET EVENT MODAL]: ", err);
      toast.error("Не удалось открыть мероприятие", {
        icon: "❌",
      });
    }
  }, [id]);

  const handleApproveEvent = async (id: number) => {
    try {
      setIsApproving(true);
      await approveEvent(id);
      await getAdminEvents();
      toast.success("Мероприятие успешно подтверждено", {
        icon: "✅",
      });
    } catch (err) {
      console.log("Не удалось подтверждить мероприятие: ", err);
      toast.error("Не удалось подтверждить мероприятие", {
        icon: "❌",
      });
    } finally {
      setIsApproving(false);
      setIsOpen?.(false);
    }
  };

  return (
    <>
      {loading || !event ? (
        <EventsItemModalSkeleton />
      ) : (
        <>
          <DialogHeader>
            <img
              src={
                event.image ? event.image : "/images/block-without-image.webp"
              }
              alt="event-image"
              className="max-h-[200px] object-contain"
            />
            <hr />
            <DialogTitle>
              <Title className="font-bold mt-2" text={event.title} size="md" />
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[35vh] overflow-y-auto px-1">
            <div className="space-y-2">
              <p>{event.description}</p>
              <div className="flex items-center gap-2">
                <Building width={16} height={16} />
                {event.company}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays width={16} height={16} />
                {event.date}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign width={16} height={16} />
                {event.paid ? "Платно" : "Бесплатно"}
                {event.price && " | " + event.price + " руб."}
              </div>
              <div className="flex items-center gap-2">
                <Wifi width={16} height={16} />
                {event.online ? "Онлайн" : "Оффлайн"}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <LinkIcon width={16} height={16} />
                  {event.link.length >= 40
                    ? event.link.slice(0, 40) + "..."
                    : event.link}
                </Link>
              </div>
            </div>
          </div>
          <DialogFooter>
            {pathname == "/admin/event-moderation" && (
              <div className="flex items-center gap-2">
                <Button
                  loading={isApproving}
                  type="button"
                  variant="default"
                  className="w-1/2"
                  onClick={() => handleApproveEvent(id)}
                >
                  Подтвердить
                </Button>
                <Button
                  loading={isApproving}
                  type="button"
                  variant="destructive"
                  className="w-1/2"
                  onClick={() => setIsRejectModal?.(true)}
                >
                  Отклонить
                </Button>
              </div>
            )}
            <DialogClose asChild>
              <Button loading={isApproving} type="button" variant="secondary">
                Закрыть
              </Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </>
  );
};
