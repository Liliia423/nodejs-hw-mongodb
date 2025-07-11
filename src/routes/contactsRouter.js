import express from 'express';
import upload from '../middlewares/upload.js';
import authenticate from '../middlewares/authenticate.js';
import * as ctrl from '../controllers/contactsController.js';

import {
  getAllContacts,
  getContactByIdController,
  addContact,
  updateContact,
  deleteContact,
} from '../controllers/contactsController.js';
import validateBody from '../middlewares/validateBody.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../schemas/contactSchemas.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
router.use(authenticate);

router.get('/', getAllContacts);

router.get('/:contactId', isValidId, getContactByIdController);

router.post('/', validateBody(createContactSchema), addContact);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  updateContact
);

router.delete('/:contactId', isValidId, deleteContact);

router.post(
  '/',
  authenticate,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrl.addContact
);
router.post('/contacts', upload.single('photo'), addContact);

router.patch(
  '/contacts/:contactId',
  authenticate,
  upload.single('photo'),
  updateContact
);

export default router;
