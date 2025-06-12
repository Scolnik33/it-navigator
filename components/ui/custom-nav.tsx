import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { buttonVariants } from "./button"
import { cn } from "@/lib/utils"

export function CustomNav({ onPreviousClick, onNextClick, dir, className }: any): ReactNode {
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
  )
}
