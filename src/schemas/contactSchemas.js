import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  contactType: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(50).optional(),
  isFavourite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  contactType: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(50),
  isFavourite: Joi.boolean(),
}).min(1);
