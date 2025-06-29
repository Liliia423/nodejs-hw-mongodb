import express from 'express';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getContactById);

router.post('/', validateBody(createContactSchema), addContact);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

router.delete('/:contactId', isValidId, deleteContact);

export default router;
