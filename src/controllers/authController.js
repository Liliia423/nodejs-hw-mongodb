import * as authService from '../services/authServices.js';
import createHttpError from 'http-errors';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        id: result._id,
        name: result.name,
        email: result.email,
        createdAt: result.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  const session = await authService.logoutUser(req.user._id);

  if (!session) {
    throw createHttpError(401, 'Not authorized');
  }

  res.status(204).end();
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const newSession = await authService.refreshSession(refreshToken);

  if (!newSession) {
    throw createHttpError(401, 'Refresh token is invalid or expired');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};

{
  /*import * as authService from '../services/authServices.js';
import createHttpError from 'http-errors';
import { logoutUser } from '../services/authServices.js';
import { refreshSession } from '../services/authServices.js';

export const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Successfully registered a user!',
      data: {
        id: result._id,
        name: result.name,
        email: result.email,
        createdAt: result.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged in!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  const session = await logoutUser(req.user._id);

  if (!session) {
    throw createHttpError(401, 'Not authorized');
  }

  res.status(204).end(); // Вихід без тіла
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const newSession = await refreshSession(refreshToken);

  if (!newSession) {
    throw createHttpError(401, 'Refresh token is invalid or expired');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: newSession.accessToken,
    },
  });
};*/
}
