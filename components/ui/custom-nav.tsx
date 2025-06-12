import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode, MouseEventHandler, JSX } from "react";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

interface CustomNavProps {
  onPreviousClick: MouseEventHandler<HTMLButtonElement>;
  onNextClick: MouseEventHandler<HTMLButtonElement>;
  dir?: string; // Если нужен, иначе убрать
  className?: string;
}

export function CustomNav({
  onPreviousClick,
  onNextClick,
  dir,
  className,
}: CustomNavProps): JSX.Element {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={onPreviousClick}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <ChevronLeft className="size-4" />
      </button>
      <button
        type="button"
        onClick={onNextClick}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        )}
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
