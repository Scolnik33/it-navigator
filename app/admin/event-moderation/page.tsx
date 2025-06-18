"use client";

import { Container, EventsItem } from "@/components/shared";
import { EventsSkeleton } from "@/components/shared/events/skeleton/events-skeleton";
import { Button } from "@/components/ui";
import { useAdminEventsStore } from "@/store/admin-events";
import { useSectionsStore } from "@/store/sections";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EventModeration() {
  const events = useAdminEventsStore((state) => state.adminEvents);
  const loading = useAdminEventsStore((state) => state.loading);
  const hasMore = useAdminEventsStore((state) => state.hasMore);
  const loadMoreEvents = useAdminEventsStore((state) => state.loadMoreEvents);
  const getAdminEvents = useAdminEventsStore((state) => state.getAdminEvents);
  const getEvents = useSectionsStore((state) => state.getEvents);
  const { data: session, status } = useSession();
  const router = useRouter();

  const filteredEvents = events.filter((item) => item.status === "WAITING");

  const handleAdminEvents = async () => {
    await getAdminEvents();
    await getEvents();
  };

  useEffect(() => {
    handleAdminEvents();
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user.role !== "ADMIN") {
      router.push("/");
    }
  }, [session]);

  return (
    <Container className="w-full min-h-screen flex flex-col items-center my-50">
      <div className="grid gap-6 justify-items-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? [...Array(6)].map((_, index) => <EventsSkeleton key={index} />)
          : filteredEvents.map((item, i) => (
              <EventsItem key={item.id + i} {...item} />
            ))}
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
    </Container>
  );
}
