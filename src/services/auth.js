{
  /*import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/user.js';

export async function register({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}*/
}

{
  /*import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';
import Session from '../models/session.js';

const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export async function register({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const accessToken = jwt.sign({ userId: user._id }, ACCESS_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId: user._id }, REFRESH_SECRET, {
    expiresIn: '7d',
  });

  const now = new Date();

  await Session.deleteMany({ userId: user._id });

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000), // 15 хв
    refreshTokenValidUntil: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 днів
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
}

export default {
  register,
  login,
};*/
}

import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Session from '../models/session.js';

export async function register({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  const accessTokenValidUntil = new Date(Date.now() + 15 * 60 * 1000);
  const refreshTokenValidUntil = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
}
