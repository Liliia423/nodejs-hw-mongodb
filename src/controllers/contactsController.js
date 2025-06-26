import Contact from '../models/contactModel.js';
import createHttpError from 'http-errors';
{
  /*import * as contactsService from '../services/contacts.js';*/
}
import { createContact } from '../services/contactsServices.js';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    //перевірка статусу 500
    {
      /*const contacts = await Contact.fnd();*/
    }

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (err) {
    next(createHttpError(500, err.message));
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (err) {
    next(createHttpError(404, 'Contact not found'));
  }
};

{
  /*export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createHttpError(400, 'Missing required fields');
    }

    const newContact = await contactsService.createContactService({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};*/
}

export const addContact = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};
