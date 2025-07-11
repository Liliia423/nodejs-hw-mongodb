import Contact from '../models/contactModel.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import {
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;

  const limit = parseInt(perPage);
  const skip = (parseInt(page) - 1) * limit;
  const sortDirection = sortOrder === 'desc' ? -1 : 1;
  const sortOptions = { [sortBy]: sortDirection };

  const filter = { userId: req.user._id };
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) {
    filter.isFavourite = isFavourite === 'true';
  }

  const totalItems = await Contact.countDocuments(filter);
  const contacts = await Contact.find(filter)
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

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContact = async (req, res) => {
  const { name, phoneNumber, contactType, email, isFavourite } = req.body;
  const photo = req.file ? req.file.path : '';

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
    photo,
    userId: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;
  const userId = req.user._id;

  const updatedContact = await updateContactById(contactId, userId, body);

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(400, 'Invalid contact ID format');
  }

  const deletedContact = await deleteContactById(contactId, userId);

  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
