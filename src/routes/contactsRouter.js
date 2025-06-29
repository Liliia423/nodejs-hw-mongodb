import express from 'express';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContacts));

// отримання контакта за id із валідацією
{
  /*router.get('/:id', ctrlWrapper(getContactById));*/
}
router.get('/:contactId', isValidId, getContactById);

// створення нового контакту із валідацією
{
  /*router.post('/', ctrlWrapper(addContact));*/
}
router.post('/', validateBody(createContactSchema), addContact);

// оновлення контакту із валідацією
{
  /*router.patch('/:contactId', ctrlWrapper(updateContact));*/
}
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

// видалення контакту із валідацією
{
  /*router.delete('/:contactId', ctrlWrapper(deleteContact));*/
}
router.delete('/:contactId', isValidId, deleteContact);

export default router;
