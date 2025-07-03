// src/controllers/auth.js
import * as authService from '../services/auth.js';

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
