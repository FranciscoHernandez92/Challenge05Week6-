import { type Author } from '../authors/authors';

export type Book = {
  id: string;
  name: string;
  author: Partial<Author>;
  category: string;
  isPartOfSeries: boolean;
};

export type BookCreateDto = {
  name: string;
  authorId: string;
  category: string;
  isPartOfSeries: boolean;
};
