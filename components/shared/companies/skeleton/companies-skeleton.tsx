import React from "react";
import { Carousel } from "../../../ui";

export const CompaniesSkeleton: React.FC = () => {
  return (
    <Carousel.CarouselItem>
      <div className="p-1 flex justify-center">
        <div className="w-3/5 h-94 flex items-center pe-6 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden animate-pulse">
          <div className="bg-slate-200 h-full w-[55%]" />

          <div className="flex flex-col justify-between p-6 leading-normal w-[45%] space-y-3">
            <div className="h-6 bg-slate-200 rounded w-3/4" />

            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-11/12" />
              <div className="h-4 bg-slate-200 rounded w-10/12" />
              <div className="h-4 bg-slate-200 rounded w-9/12" />
            </div>

            <div className="h-10 bg-slate-300 rounded w-[200px] mt-4" />
          </div>
        </div>
      </div>
    </Carousel.CarouselItem>
  );
};
