import express from 'express';
import {
  register,
  login,
  logout,
  refresh,
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/authSchemas.js';
import { isAuth } from '../middlewares/isAuth.js';

const router = express.Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', isAuth, logout);
router.post('/refresh', refresh);

export default router;
