import React from "react";

export const EventsSkeleton: React.FC = () => {
  return (
    <div className="relative flex flex-col bg-white shadow-lg border border-slate-200 rounded-2xl w-full max-w-sm animate-pulse">
      <div className="p-4 w-full">
        <div className="h-[172px] max-h-[214px] bg-slate-200 rounded-t-2xl w-full mb-4" />
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-11/12" />
          <div className="h-4 bg-slate-200 rounded w-10/12" />
          <div className="h-4 bg-slate-200 rounded w-9/12" />
          <div className="h-4 bg-slate-200 rounded w-8/12" />
          <div className="h-4 bg-slate-200 rounded w-7/12" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
        <div className="flex space-x-2 items-center text-[12px] sm:text-sm font-medium">
          <div className="h-4 w-16 bg-slate-200 rounded" />
          <span className="w-px h-5 bg-slate-300" />
          <div className="h-4 w-16 bg-slate-200 rounded" />
        </div>
        <div className="h-4 w-20 bg-slate-200 rounded text-[11px] sm:text-base" />
      </div>
    </div>
  );
};
