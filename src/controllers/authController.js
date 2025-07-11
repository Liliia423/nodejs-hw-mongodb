import { registerUser, loginUser } from '../services/authServices.js';
import { refreshSession } from '../services/authServices.js';
import { logoutUser } from '../services/authServices.js';
import { Resend } from 'resend';
import { sendWithResend } from '../senders/sendWithResend.js';
import { sendWithUkrNet } from '../senders/sendWithUkrNet.js';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import createError from 'http-errors';

import User from '../models/user.js';

const useUkrNet = process.env.USE_UKRNET === 'true';
const sender =
  process.env.USE_UKRNET === 'true' ? sendWithUkrNet : sendWithResend;

const resend = new Resend(process.env.RESEND_API_KEY);

const { JWT_SECRET } = process.env;

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: 'error', message: 'All fields are required' });
    }

    const user = await registerUser({ name, email, password });

    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and password are required',
      });
    }

    const { accessToken, refreshToken } = await loginUser({ email, password });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        status: 'error',
        message: 'Refresh token is missing',
      });
    }

    const accessToken = await refreshSession(refreshToken);

    res.status(200).json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await logoutUser(req);
    res.clearCookie('refreshToken');
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const sendEmailController = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw createError(404, 'User not found!');

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '5m' });
    const resetLink = `${process.env.APP_DOMAIN}/reset-password?token=${token}`;

    {
      /*await resend.emails.send({
      from: 'Your App <onboarding@resend.dev>',
      to: email,
      subject: 'Reset your password',
      html: `
        <p>Click the link to reset your password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      `,
    });*/
    }

    await sender({
      to: email,
      subject: 'Reset your password',
      html: `
        <p>Click the link to reset your password:</p>
        <p><a href="${resetLink}">${resetLink}</a></p>
      `,
    });

    res.status(200).json({
      status: 200,
      message: 'Reset password email has been successfully sent.',
      data: {},
    });
  } catch (error) {
    console.error(error);
    next(createError(500, 'Failed to send the email, please try again later.'));
  }
};

export const resetPasswordController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      throw createError(400, 'Token and password are required');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw createError(401, 'Token is expired or invalid.');
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      throw createError(404, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      status: 200,
      message: 'Password has been successfully reset.',
      data: {},
    });
  } catch (error) {
    console.error('resetPasswordController error:', error.message);
    next(error);
  }
};
