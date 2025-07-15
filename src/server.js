import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import contactsRouter from './routes/contactsRouter.js';

import swaggerUi from 'swagger-ui-express';

import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

{
  /*const swaggerDocument = YAML.load(
  path.join(__dirname, '..', 'docs', 'swagger.json')
);*/
}

const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cookieParser());
app.use('/contacts', contactsRouter);

import authRouter from './routes/authRouter.js';
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(err?.status || 500).json({
    status: 'error',
    message: err?.message || 'Internal Server Error',
  });
});

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

export default app;
