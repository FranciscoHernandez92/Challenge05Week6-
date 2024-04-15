import Joi from 'joi';
import { type SportCreateDto, type SportUpdateDto } from './sport';

export const sportCreateDtoSchema = Joi.object<SportCreateDto>({
  name: Joi.string().required(),
  isColective: Joi.boolean().required(),
});

export const sportUpdateDtoSchema = Joi.object<SportUpdateDto>({
  name: Joi.string().required(),
  isColective: Joi.boolean().required(),
});
// JOI RESTRINGE AL USUARIO QUE PUEDA CREAR UNA PROPIEDAD DISTINTA A LA QUE APAREZCA EN MI MODELO DE DATOS
