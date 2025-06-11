import React from "react";

export const Checkbox: React.FC = () => {
  return (
    <div className="flex items-center">
      <input type="checkbox" id="filters" />
      <label htmlFor="filters">Чекбокс</label>
    </div>
  );
};
