import type { ConversionCategoryDto } from "../../dto";

export const convert = (
  value: number,
  from: string,
  to: string,
  category: ConversionCategoryDto,
): number => {
  if (category.id === "temperature") {
    const celsius =
      from === "f"
        ? ((value - 32) * 5) / 9
        : from === "k"
          ? value - 273.15
          : value;

    return to === "f"
      ? (celsius * 9) / 5 + 32
      : to === "k"
        ? celsius + 273.15
        : celsius;
  }

  const fromFactor =
    category.units.find((unit) => unit.id === from)?.factor ?? 1;
  const toFactor = category.units.find((unit) => unit.id === to)?.factor ?? 1;

  return (value * fromFactor) / toFactor;
};
