"use client";

import React from "react";
import { Title } from "../title";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AddEventForm } from "../index";
import { Button } from "../../ui";
import { useAuthLoading } from "@/hooks/useAuthLoading";
import { useSession } from "next-auth/react";
import { useCloseButtonRef } from "@/hooks/useCloseButtonRef";
import Link from "next/link";

export const AddEventModal: React.FC = () => {
  const closeBtnRef = useCloseButtonRef();
  const loading = useAuthLoading();
  const { data: session, status } = useSession();

  if (!(status === "authenticated" || loading)) return null;

  return (
    <Dialog>
      {session?.user.role === "ADMIN" ? (
        <Link href={"/admin/event-moderation"}>
          <Button
            size="xl"
            variant="secondary"
            className="w-full hover:bg-secondary/60 hover:shadow-sm"
            loading={loading}
            type="button"
          >
            Предложенные мероприятия
          </Button>
        </Link>
      ) : (
        <DialogTrigger asChild>
          <Button
            size="xl"
            variant="secondary"
            className="hover:bg-secondary/60 hover:shadow-sm text-sm md:text-base w-full sm:w-auto"
            loading={loading}
            type="button"
          >
            Добавить мероприятие
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Title
              className="font-bold text-blue-500"
              text="Добавить мероприятие"
              size="md"
            />
          </DialogTitle>
        </DialogHeader>

        <AddEventForm closeBtnRef={closeBtnRef} session={session} />
      </DialogContent>
    </Dialog>
  );
};
