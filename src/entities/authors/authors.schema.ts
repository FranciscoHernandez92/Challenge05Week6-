import Joi from 'joi';
import { type AuthorCreateDto } from './authors';

export const authorCreateDtoSchema = Joi.object<AuthorCreateDto>({
  name: Joi.string().required(),
  birthDate: Joi.date().required(),
  nacionality: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const authorUpdateDtoSchema = Joi.object<AuthorCreateDto>({
  name: Joi.string(),
  birthDate: Joi.date(),
  nacionality: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
});
