import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 md:px-8 max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-[1280px]",
        className
      )}
    >
      {children}
    </div>
  );
};
