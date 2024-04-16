import Joi from 'joi';
import { type CountryUpdateDto, type CountryCreateDto } from './countries';

export const countryCreateDtoSchema = Joi.object<CountryCreateDto>({
  name: Joi.string().required(),
  population: Joi.number().required(),
});

export const countryUpdateDtoSchema = Joi.object<CountryUpdateDto>({
  name: Joi.string().required(),
  population: Joi.number().required(),
});
