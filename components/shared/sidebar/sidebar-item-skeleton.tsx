import React from "react";

export const SidebarItemSkeleton: React.FC = () => {
  return (
    <div className="w-full rounded-md border border-slate-200 p-4 shadow-sm bg-white space-y-3 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-slate-200" />
          <div className="h-4 w-32 bg-slate-200 rounded" />
        </div>
        <div className="h-3 w-20 bg-slate-200 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-3 w-5/6 bg-slate-200 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 rounded" />
      </div>

      <div className="h-4 w-24 bg-slate-200 rounded" />
    </div>
  );
};
