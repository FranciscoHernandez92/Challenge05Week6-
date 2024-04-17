import Joi from 'joi';
import { type BookCreateDto } from './books';

export const bookCreateDtoSchema = Joi.object<BookCreateDto>({
  name: Joi.string().required(),
  authorId: Joi.string().required(),
  category: Joi.string().required(),
  isPartOfSeries: Joi.boolean().default(false),
});

export const bookUpdateDtoSchema = Joi.object<BookCreateDto>({
  name: Joi.string(),
  authorId: Joi.string(),
  category: Joi.string(),
  isPartOfSeries: Joi.boolean(),
});
