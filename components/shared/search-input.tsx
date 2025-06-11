"use client";

import React from "react";
import { Input } from "../ui";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInput: React.FC<Props> = ({
  className,
  setIsVisible,
  value,
  setValue,
}) => {
  const handleInput = () => {
    if (!value) {
      setIsVisible?.(false);
    } else {
      setValue("");
    }
  };

  return (
    <div className="relative">
      <Input
        placeholder="Поиск мероприятий"
        className={cn("pe-7", className)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <X
        className="absolute right-[10px] top-[10px] z-10 cursor-pointer"
        width={14}
        height={14}
        onClick={handleInput}
      />
    </div>
  );
};
