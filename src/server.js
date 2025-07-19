import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import contactsRouter from './routes/contactsRouter.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import usersRouter from './routes/usersRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/users', usersRouter);

// Отримання поточної директорії
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Шлях до swagger.json
const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf8'));

// Swagger UI
app.use('/api-docs', ...swaggerDocs(swaggerDocument));

// Статичні swagger-файли (якщо треба напряму відкривати JSON)
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Маршрути
// app.use('/api/contacts', contactsRouter);

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
