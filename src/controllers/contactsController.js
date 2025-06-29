import Contact from '../models/contactModel.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import { createContact } from '../services/contactsServices.js';
import { updateContactById } from '../services/contactsServices.js';
import { deleteContactById } from '../services/contactsServices.js';

// router.get('/', getAllContacts);
{
  /*export const getAllContacts = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query;

  const limit = parseInt(perPage);
  const skip = (parseInt(page) - 1) * limit;

  const totalItems = await Contact.countDocuments();
  const contacts = await Contact.find().skip(skip).limit(limit);

  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: parseInt(page),
      perPage: limit,
      totalItems,
      totalPages,
      hasPreviousPage: parseInt(page) > 1,
      hasNextPage: parseInt(page) < totalPages,
    },
  });
};*/
}
export const getAllContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
  } = req.query;

  const limit = parseInt(perPage);
  const skip = (parseInt(page) - 1) * limit;

  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sortOptions = { [sortBy]: sortDirection };

  const totalItems = await Contact.countDocuments();
  const contacts = await Contact.find()
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const totalPages = Math.ceil(totalItems / limit);

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: {
      data: contacts,
      page: parseInt(page),
      perPage: limit,
      totalItems,
      totalPages,
      hasPreviousPage: parseInt(page) > 1,
      hasNextPage: parseInt(page) < totalPages,
    },
  });
};

//router.get('/:contactId', isValidId, getContactById);
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

//router.post('/', validateBody(createContactSchema), addContact);
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

//router.patch('/:contactId', isValidId, validateBody(updateContactSchema), updateContact);
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

//router.delete('/:contactId', isValidId, deleteContact);
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
