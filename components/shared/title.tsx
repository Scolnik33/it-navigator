import React from "react";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
  text: string;
  size: TextSize;
  className?: string;
}

export const Title: React.FC<Props> = ({ text, size, className }) => {
  const mapSizes = {
    xs: "text-[16px]",
    sm: "text-[22px]",
    md: "text-[26px]",
    lg: "text-[32px]",
    xl: "text-[40px]",
    "2xl": "text-[48px]",
  };

  return <div className={`${mapSizes[size]} ${className}`}>{text}</div>;
};
