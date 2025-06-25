import dotenv from 'dotenv';
dotenv.config();

console.log('MONGODB_USER from .env:', process.env.MONGODB_USER);

import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

(async () => {
  await initMongoConnection();
  setupServer();
})();
