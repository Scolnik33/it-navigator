import React from "react";

export const AddEventFormSkeleton: React.FC = () => {
  return (
    <form className="space-y-4 animate-pulse">
      <div className="mb-4">
        <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-10 bg-slate-200 rounded" />
      </div>

      <div className="mb-4">
        <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-10 bg-slate-200 rounded" />
      </div>

      <div className="mb-4">
        <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-10 bg-slate-200 rounded" />
      </div>

      <div className="mb-4">
        <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-24 bg-slate-200 rounded" />
      </div>

      <div className="mb-4">
        <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
        <div className="h-10 bg-slate-200 rounded w-1/2" />
      </div>

      <div className="space-y-3">
        <div className="h-4 w-36 bg-slate-200 rounded" />
        <div className="h-4 w-36 bg-slate-200 rounded" />
        <div className="h-10 w-24 bg-slate-200 rounded" />
      </div>

      {/* Кнопки */}
      <div className="flex justify-end space-x-2 pt-4">
        <div className="h-10 w-28 bg-slate-300 rounded" />
        <div className="h-10 w-24 bg-slate-200 rounded" />
      </div>
    </form>
  );
};
