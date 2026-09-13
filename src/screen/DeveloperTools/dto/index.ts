export interface DeveloperToolDto {
  id: string;
  name: string;
  description: string;
  example: string;
}

export interface DeveloperToolCategoryDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  tools: DeveloperToolDto[];
}
