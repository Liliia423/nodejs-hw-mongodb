import express from 'express';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  patchContactById,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:id', ctrlWrapper(getContactById));

router.post('/', ctrlWrapper(addContact));
router.patch('/:contactId', ctrlWrapper(updateContact));
router.patch('/:id', ctrlWrapper(patchContactById));

export default router;
