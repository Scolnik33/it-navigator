import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  isImageOnRight: boolean;
};

export const EducationSkeleton: React.FC<Props> = ({ isImageOnRight }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-6 lg:gap-8 animate-pulse",
        isImageOnRight ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      <div className="w-full lg:w-1/2">
        <div className="w-full h-[300px] lg:h-full bg-slate-200 rounded-3xl" />
      </div>

      <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/2" />

          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-11/12" />
            <div className="h-4 bg-slate-200 rounded w-10/12" />
            <div className="h-4 bg-slate-200 rounded w-9/12" />
            <div className="h-4 bg-slate-200 rounded w-8/12" />
            <div className="h-4 bg-slate-200 rounded w-7/12" />
            <div className="h-4 bg-slate-200 rounded w-6/12" />
            <div className="h-4 bg-slate-200 rounded w-5/12" />
            <div className="h-4 bg-slate-200 rounded w-4/12" />
          </div>
        </div>

        <div className="h-10 bg-slate-300 rounded w-full lg:w-1/3 mt-6" />
      </div>
    </div>
  );
};
