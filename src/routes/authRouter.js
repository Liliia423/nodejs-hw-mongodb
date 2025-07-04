import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../schemas/authSchemas.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

export default router;
