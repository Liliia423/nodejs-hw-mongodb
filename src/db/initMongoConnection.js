{
  /*import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import Contact from '../models/contactModel.js';

export async function initMongoConnection() {
  try {
    const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoUri);
    console.log('Mongo connection successfully established!');

    const count = await Contact.countDocuments();
    if (count === 0) {
      const dataPath = path.resolve('src', 'data', 'contacts.json');
      const fileContent = await fs.readFile(dataPath, 'utf-8');
      const contacts = JSON.parse(fileContent);

      await Contact.insertMany(contacts);
      console.log('Contacts imported to MongoDB');
    }
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  }
}*/
}
