export type Country = {
  id: string;
  name: string;
  population: number;
};

export type CountryCreateDto = {
  name: string;
  population: number;
};

export type CountryUpdateDto = {
  name?: string;
  population?: number;
};
