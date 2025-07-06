{
  /*import express from 'express';
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

router.post('/register', validateBody(registerSchema), register); //виключити валідацію
router.post('/login', validateBody(loginSchema), login);
router.post('/logout', isAuth, logout);
router.post('/refresh', refresh);

export default router;*/
}

import express from 'express';
import { register, login, refresh } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);

export default router;
