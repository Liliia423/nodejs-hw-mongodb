import express from 'express';
import validateBody from '../middlewares/validateBody.js';

import { sendEmailSchema } from '../schemas/sendEmailSchema.js';
import { resetPasswordSchema } from '../schemas/resetPasswordSchema.js';
import { resetPwdSchema } from '../schemas/resetPwdSchema.js';

import {
  register,
  login,
  refresh,
  logout,
  sendEmailController,
  resetPasswordController,
  resetPwdController,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.post(
  '/send-reset-email',
  validateBody(sendEmailSchema),
  sendEmailController
);
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  resetPasswordController
);

router.post('/reset-pwd', validateBody(resetPwdSchema), resetPwdController);

export default router;
