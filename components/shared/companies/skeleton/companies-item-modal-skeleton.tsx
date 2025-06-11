import React from "react";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const CompaniesItemModalSkeleton: React.FC = () => {
  return (
    <>
      <DialogHeader>
        <div className="w-full h-[200px] bg-slate-200 rounded-md animate-pulse" />
        <hr />
        <DialogTitle>
          <div className="h-6 w-3/4 bg-slate-200 rounded mt-3 animate-pulse" />
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 animate-pulse">
        <div className="h-4 w-full bg-slate-200 rounded" />
        <div className="h-4 w-5/6 bg-slate-200 rounded" />

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded" />
          <div className="w-1/2 h-4 bg-slate-200 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded" />
          <div className="w-1/3 h-4 bg-slate-200 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded" />
          <div className="w-1/3 h-4 bg-slate-200 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded" />
          <div className="w-2/3 h-4 bg-slate-200 rounded" />
        </div>
      </div>

      <DialogFooter className="mt-6 animate-pulse">
        <div className="w-full h-8 bg-slate-200 rounded" />
      </DialogFooter>
    </>
  );
};
