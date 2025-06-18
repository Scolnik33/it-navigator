"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button, Calendar } from "../ui";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Props {
  value?: string;
  onChange: (date: string) => void;
}

export const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  const [date, setDate] = useState<DateRange | undefined>();

  useEffect(() => {
    if (value) {
      const [fromStr, toStr] = value.split(" - ");
      const now = new Date();
      const from = parseDate(fromStr, now);
      const to = parseDate(toStr, now);
      setDate({ from, to });
    }
  }, [value]);

  const parseDate = (dateStr: string, baseDate: Date): Date => {
    const [day, month] = dateStr.split(".").map(Number);
    return new Date(baseDate.getFullYear(), month - 1, day);
  };

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from && range?.to) {
      const formatted = `${format(range.from, "dd.MM")} - ${format(
        range.to,
        "dd.MM"
      )}`;
      onChange(formatted);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"secondary"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          onClick={() => alert('Клик')}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y", { locale: ru })} -{" "}
                {format(date.to, "LLL dd, y", { locale: ru })}
              </>
            ) : (
              format(date.from, "LLL dd, y", { locale: ru })
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          // initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  );
};
