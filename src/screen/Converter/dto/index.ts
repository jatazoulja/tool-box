export interface UnitDto {
  id: string;
  label: string;
  symbol: string;
  factor?: number;
}
export interface ConversionCategoryDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  units: UnitDto[];
  isDynamic?: boolean;
}
