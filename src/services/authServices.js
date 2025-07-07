import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import User from '../models/user.js';
import Session from '../models/session.js';

import dotenv from 'dotenv';
dotenv.config();

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '30d';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await User.create({ name, email, password: hashedPassword });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw createHttpError(401, 'Email or password is invalid');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw createHttpError(401, 'Email or password is invalid');

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    {
      expiresIn: '30d',
    }
  );

  await Session.deleteMany({ userId: user._id });

  const now = new Date();
  await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

export const refreshSession = async (refreshToken) => {
  let payload;

  try {
    payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
  } catch (error) {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const session = await Session.findOne({ refreshToken });

  if (!session) {
    throw createHttpError(401, 'Refresh token not found');
  }

  const user = await User.findById(payload.userId);
  if (!user) {
    throw createHttpError(401, 'User not found');
  }

  await Session.deleteMany({ userId: user._id });

  const newAccessToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: '15m',
    }
  );

  const newRefreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    {
      expiresIn: '30d',
    }
  );

  const now = new Date();
  await Session.create({
    userId: user._id,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: new Date(now.getTime() + 15 * 60 * 1000),
    refreshTokenValidUntil: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
  });

  return newAccessToken;
};

export const logoutUser = async (req) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(401, 'No refresh token');
  }

  await Session.findOneAndDelete({ refreshToken });
};
