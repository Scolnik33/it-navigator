import React from "react";
import { Label, RadioGroup, RadioGroupItem } from "../ui";

interface Props {
  title: "Формат" | "Оплата";
  filter: boolean | null;
  setFilter: (value: boolean | null) => void;
  filterOptions: { label: string; value: string; id: string }[];
}

export const FiltrationItem: React.FC<Props> = ({
  title,
  filter,
  setFilter,
  filterOptions,
}) => {
  return (
    <div className="flex gap-3 w-full md:w-1/2">
      <Label
        className="text-lg font-semibold text-gray-800 mb-[5px] mr-3 min-w-[80px] whitespace-nowrap"
        htmlFor={filterOptions[0].id}
      >
        {title}
      </Label>
      <RadioGroup
        value={String(filter)}
        onValueChange={(val) => {
          setFilter(val === "null" ? null : val === "true");
        }}
        className="flex flex-row items-center gap-2 flex-wrap"
      >
        {filterOptions.map(({ label, value, id }) => (
          <div
            key={id}
            className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <RadioGroupItem value={value} id={id} className="border-gray-400" />
            <Label htmlFor={id} className="text-sm text-gray-700 cursor-pointer">
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
