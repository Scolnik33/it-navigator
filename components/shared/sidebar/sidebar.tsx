"use client";

import React, { useEffect } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { Button } from "../../ui";
import { Bell } from "lucide-react";
import { Title } from "../title";
import { useSession } from "next-auth/react";
import { useNotificationStore } from "@/store/notification";
import { SidebarItem } from "./sidebar-item";
import { SidebarItemSkeleton } from "./sidebar-item-skeleton";

export const Sidebar: React.FC = () => {
  const { data: session } = useSession();
  const notifications = useNotificationStore((state) => state.notification);
  const loading = useNotificationStore((state) => state.loading);
  const getNotification = useNotificationStore(
    (state) => state.getNotification
  );

  useEffect(() => {
    if (session) {
      getNotification(Number(session.user.id));
    }
  }, [session]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Bell
          className="cursor-pointer hover:opacity-70"
          width={20}
          height={20}
        />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto overflow-x-hidden">
        <SheetHeader>
          <SheetTitle>
            <Title
              text="Уведомления"
              size="sm"
              className="font-bold text-blue-500"
            />
          </SheetTitle>
          <SheetDescription className="space-y-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <SidebarItemSkeleton key={i} />
              ))
            ) : notifications.length > 0 ? (
              notifications.map((item) => (
                <SidebarItem key={item.id} {...item} getNotification={getNotification} />
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Здесь будут отображаться все уведомления о новых мероприятиях и
                новостях.
              </p>
            )}
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Закрыть</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
