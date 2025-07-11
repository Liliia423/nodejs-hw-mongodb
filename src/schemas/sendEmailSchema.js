import Joi from 'joi';

export const sendEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
