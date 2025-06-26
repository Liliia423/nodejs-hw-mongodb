import Contact from '../models/contactModel.js';
import createHttpError from 'http-errors';

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
