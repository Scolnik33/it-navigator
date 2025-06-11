"use client";

import React, { useEffect, useState } from "react";
import { Input, Label, Switch } from "../ui";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  initialOnline?: boolean;
  initialPaid?: boolean;
  initialPrice?: number | null;
  onChangePaid: (value: boolean) => void;
  onChangeOnline: (value: boolean) => void;
  onChangePrice: (value: number) => void;
}

export const ChooseVariants: React.FC<Props> = ({
  className,
  initialOnline,
  initialPaid,
  initialPrice,
  onChangePaid,
  onChangeOnline,
  onChangePrice,
}) => {
  const [paid, setPaid] = useState(false);
  const [online, setOnline] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (typeof initialPaid === "boolean") setPaid(initialPaid);
    if (typeof initialOnline === "boolean") setOnline(initialOnline);
    if (typeof initialPrice === "number") setPrice(initialPrice);
  }, [initialPaid, initialOnline, initialPrice]);

  const handleSwitchPaid = () => {
    setPaid(!paid);
    onChangePaid(!paid);
  };

  const handleSwitchOnline = () => {
    setOnline(!online);
    onChangeOnline(!online);
  };

  return (
    <div className={cn("flex mb-8", className)}>
      <div className="flex items-center space-x-2">
        <Switch
          id="paid/free"
          className="cursor-pointer mt-[1px]"
          checked={paid}
          onClick={handleSwitchPaid}
        />
        <Label htmlFor="paid/free" className="text-base">
          {paid ? "Платно" : "Бесплатно"}
        </Label>
        <Input
          type="number"
          placeholder="Введите сумму"
          disabled={!paid}
          value={price || ""}
          onChange={(e) => {
            const value = Number(e.target.value);
            setPrice(value);
            onChangePrice(value);
          }}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="online/offline"
          className="cursor-pointer mt-[1px]"
          checked={online}
          onClick={handleSwitchOnline}
        />
        <Label htmlFor="online/offline" className="text-base">
          {online ? "Онлайн" : "Оффлайн"}
        </Label>
      </div>
    </div>
  );
};
