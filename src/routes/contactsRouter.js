import express from 'express';
import {
  getAllContacts,
  getContactById,
  addContact,
} from '../controllers/contactsController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContacts));
router.get('/:id', ctrlWrapper(getContactById));

router.post('/', ctrlWrapper(addContact));

export default router;
