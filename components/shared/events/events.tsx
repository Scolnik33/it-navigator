"use client";

import React from "react";
import { EventsItem } from "./events-item";
import { cn } from "@/lib/utils";
import { useSectionsStore } from "@/store/sections";
import { EventsSkeleton } from "./skeleton/events-skeleton";
import { Button } from "@/components/ui";

interface Props {
  className?: string;
}

export const Events: React.FC<Props> = ({ className }) => {
  const events = useSectionsStore((state) => state.events);
  const getEvents = useSectionsStore((state) => state.getEvents);
  const loading = useSectionsStore((state) => state.loading);
  const loadMoreEvents = useSectionsStore((state) => state.loadMoreEvents);
  const hasMore = useSectionsStore((state) => state.hasMoreEvents);

  const filteredEvents = events.filter((item) => item.status === "ACCEPTED");

  return (
    <>
      <div
        className={cn(
          "grid gap-6 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {loading ? (
          [...Array(6)].map((_, index) => <EventsSkeleton key={index} />)
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <EventsItem key={item.id} {...item} getEvents={getEvents} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center text-slate-500 p-10 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-sm">
              Попробуйте изменить параметры фильтрации или повторите позже.
            </p>
          </div>
        )}
      </div>

      {hasMore && filteredEvents.length > 5 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            loading={loading}
            onClick={loadMoreEvents}
          >
            Показать больше
          </Button>
        </div>
      )}
    </>
  );
};
