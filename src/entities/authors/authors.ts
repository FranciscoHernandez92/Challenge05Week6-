import { type Book } from '../books/books';

export type Author = {
  id: string;
  name: string;
  birthDate: Date;
  nacionality: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  books: Partial<Book>;
};

export type AuthorCreateDto = {
  name: string;
  birthDate: Date;
  nacionality: string;
  email: string;
  password: string;
};
