import * as authService from '../services/authServices.js';

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
