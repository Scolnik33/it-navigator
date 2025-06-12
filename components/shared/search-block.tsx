"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { SearchInput, SearchItem, Sidebar } from ".";
import { search } from "@/services/search";
import { Event } from "@prisma/client";
import { Button } from "../ui";
import { useSession } from "next-auth/react";

export const SearchBlock: React.FC = () => {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      search(value)
        .then((data) => setEvents(data))
        .then(() => setIsLoading(false));
    }, 500);
  }, [value]);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
      {!isVisible && (
        <>
          {session != null && <Sidebar />}
          <Search
            className="cursor-pointer hover:opacity-70"
            width={20}
            height={20}
            onClick={() => setIsVisible(true)}
          />
        </>
      )}

      {isVisible && (
        <SearchInput
          setIsVisible={setIsVisible}
          value={value}
          setValue={setValue}
        />
      )}

      {isLoading && isVisible && (
        <div className="w-[225px] lg:w-[200px] absolute mt-2 top-[77%] lg:top-[65%] left-[15px] lg:left-[1134px] border border-slate-200 rounded-md bg-white shadow-md z-10">
          <Button loading={true} variant={"link"} className="w-full" />
        </div>
      )}

      {value.length > 0 && isVisible && !isLoading && (
        <div
          className={`w-[225px] lg:w-[200px] absolute mt-2 top-[77%] lg:top-[65%] left-[15px] lg:left-[1134px] border border-slate-200 rounded-md bg-white shadow-md z-10 ${
            popupIsOpen ? "hidden" : ""
          }`}
        >
          {events.length > 0 ? (
            events.map((item) => (
              <SearchItem
                key={item.id}
                {...item}
                setPopupIsOpen={setPopupIsOpen}
                setIsVisible={setIsVisible}
                setValue={setValue}
              />
            ))
          ) : (
            <div className="px-4 py-2">Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
};
