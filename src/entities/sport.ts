// E export type SportsList = {
//   sport: Sport;
// };

export type Sport = {
  id: string;
  name: string;
  imageUrl?: string;
  isColective: boolean;
};

export type SportCreateDto = {
  name: string;
  isColective: boolean;
};

export type SportUpdateDto = {
  name?: string;
  isColective?: boolean;
};
