"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSectionsStore } from "@/store/sections";
import { FiltrationItem } from "./filtration-item";

interface Props {
  className?: string;
}

const onlineFilterOptions = [
  { label: "Все", value: "null", id: "online-all" },
  { label: "Онлайн", value: "true", id: "online-yes" },
  { label: "Оффлайн", value: "false", id: "online-no" },
];

const paidFilterOptions = [
  { label: "Все", value: "null", id: "paid-all" },
  { label: "Платное", value: "true", id: "paid-yes" },
  { label: "Бесплатное", value: "false", id: "paid-no" },
];

export const Filtration: React.FC<Props> = ({ className }) => {
  const getEvents = useSectionsStore((state) => state.getEvents);
  const [paid, setPaid] = useState<boolean | null>(null);
  const [online, setOnline] = useState<boolean | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getEvents({
      paid: paid == null ? undefined : paid,
      online: online == null ? undefined : online,
      offset: 0,
    });
  }, [paid, online]);

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-6 mb-7 bg-white rounded-lg shadow-sm p-6 ${className}`}
    >
      <FiltrationItem
        title="Формат"
        filter={online}
        setFilter={setOnline}
        filterOptions={onlineFilterOptions}
      />
      <FiltrationItem
        title="Оплата"
        filter={paid}
        setFilter={setPaid}
        filterOptions={paidFilterOptions}
      />
    </div>
  );
};
