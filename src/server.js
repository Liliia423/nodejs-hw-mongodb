import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactsRouter from './routes/contactsRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/contacts', contactsRouter);

import authRouter from './routes/authRouter.js';
app.use('/auth', authRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
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

export default app;
