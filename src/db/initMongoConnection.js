const mongoose = require('mongoose');

async function initMongoConnection() {
  try {
    const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoUri);
    console.log('Mongo connection successfully established!');
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  }
}

module.exports = { initMongoConnection };
