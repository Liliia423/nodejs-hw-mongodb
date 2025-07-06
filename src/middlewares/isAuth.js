{
  /*import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { findSession } from '../services/authServices.js';

export const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(401, 'Not authorized');
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const session = await findSession(payload.sessionId);
    if (!session) {
      throw createHttpError(401, 'Session expired or invalid');
    }

    req.user = {
      _id: payload.userId,
      sessionId: payload.sessionId,
    };

    next();
  } catch (error) {
    next(createHttpError(401, 'Not authorized'));
  }
};*/
}
