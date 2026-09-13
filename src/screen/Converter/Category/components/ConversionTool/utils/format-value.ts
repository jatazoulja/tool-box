export const formatValue = (value: number): string =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 10 }).format(value);
