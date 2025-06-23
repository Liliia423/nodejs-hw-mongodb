require('dotenv').config();
console.log('MONGODB_USER from .env:', process.env.MONGODB_USER);

const { setupServer } = require('./server');
const { initMongoConnection } = require('./db/initMongoConnection');

(async () => {
  await initMongoConnection();
  setupServer();
})();
