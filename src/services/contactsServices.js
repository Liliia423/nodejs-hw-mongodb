import Contact from '../models/contactModel.js';

export const getContactById = async (contactId, userId) => {
  console.log({
    contactId,
    userId,
    contactIdType: typeof contactId,
    userIdType: typeof userId,
  });

  return await Contact.findOne({ _id: contactId, userId });
};

export const createContact = async (contactData) => {
  return await Contact.create(contactData);
};

export const updateContactById = async (contactId, userId, body) => {
  return await Contact.findOneAndUpdate({ _id: contactId, userId }, body, {
    new: true,
  });
};

export const deleteContactById = async (contactId, userId) => {
  return await Contact.findOneAndDelete({ _id: contactId, userId });
};
