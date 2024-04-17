export type Author = {
  id: string;
  name: string;
  birthDate: Date;
  nacionality: string;
  email: string;
};

export type AuthorCreateDto = {
  name: string;
  birthDate: Date;
  nacionality: string;
  email: string;
};
