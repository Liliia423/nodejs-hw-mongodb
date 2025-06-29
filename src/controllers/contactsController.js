import Contact from '../models/contactModel.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import { createContact } from '../services/contactsServices.js';
import { updateContactById } from '../services/contactsServices.js';
import { deleteContactById } from '../services/contactsServices.js';

// router.get('/', ctrlWrapper(getAllContacts));
export const getAllContacts = async (req, res) => {
  const contacts = await Contact.find();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

//router.get('/:id', ctrlWrapper(getContactById));
export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

//router.post('/', ctrlWrapper(addContact));
export const addContact = async (req, res) => {
  const { name, phoneNumber, contactType, email, isFavourite } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Missing required fields: name, phoneNumber, or contactType'
    );
  }

  const newContact = await createContact({
    name,
    phoneNumber,
    contactType,
    email,
    isFavourite,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

//router.patch('/:contactId', ctrlWrapper(updateContact));
export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const updatedContact = await updateContactById(contactId, body);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

//router.delete('/:contactId', ctrlWrapper(deleteContact));
export const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const deletedContact = await deleteContactById(contactId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
