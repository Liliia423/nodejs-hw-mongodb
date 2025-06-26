import Contact from '../models/contactModel.js';

export const createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);
  return newContact;
};
