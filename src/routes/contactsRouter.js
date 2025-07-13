import express from 'express';
import upload from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  getAllContacts,
  getContactByIdController,
  addContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactSchemas.js';

const router = express.Router();

// Захист для всіх роутів
router.use(authenticate);

// Отримати всі контакти
router.get('/', getAllContacts);

// Отримати контакт за ID
router.get('/:contactId', isValidId, getContactByIdController);

// Додати новий контакт з фото
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  addContact
);

// Оновити контакт за ID (з фото)
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  updateContact
);

// Видалити контакт
router.delete('/:contactId', isValidId, deleteContact);

export default router;
