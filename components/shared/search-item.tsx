import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import { EventsItemModal } from "./events/events-item-modal";
import { Event } from "@prisma/client";
import { DialogPortal } from "@radix-ui/react-dialog";

export const SearchItem: React.FC<
  Event & {
    setPopupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }
> = ({ id, title, image, setPopupIsOpen, setIsVisible, setValue }) => {
  return (
    <Dialog
      onOpenChange={(open) => {
        setPopupIsOpen(open);
        if (!open) {
          setIsVisible(false);
          setValue("");
        }
      }}
    >
      <DialogTrigger asChild>
        <div className="px-3 py-2 border-b transition-all duration-100 hover:bg-blue-100 flex items-center gap-3 cursor-pointer">
          <img
            src={image ? image : "./images/block-without-image.webp"}
            alt="event-image"
            className="w-[60px] h-[40px]"
          />
          <div>{title.length >= 22 ? title.slice(0, 22) + "..." : title}</div>
        </div>
      </DialogTrigger>

      <DialogPortal>
        <DialogContent className="sm:max-w-4xl">
          <EventsItemModal id={id} />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
