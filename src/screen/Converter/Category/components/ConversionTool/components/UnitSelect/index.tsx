import React from "react";
import type { UnitDto } from "../../../../../dto";
import "./index.css";
interface UnitSelectProps {
  value: string;
  onChange: (value: string) => void;
  units: UnitDto[];
}
export const UnitSelect: React.FC<UnitSelectProps> = ({
  value,
  onChange,
  units,
}) => (
  <select
    aria-label="Unit"
    className="unit-select"
    value={value}
    onChange={(event) => onChange(event.target.value)}
  >
    {units.map((unit) => (
      <option key={unit.id} value={unit.id}>
        {unit.label} ({unit.symbol})
      </option>
    ))}
  </select>
);
