// routes/usersRouter.js
import express from 'express';
import { getCurrent } from '../controllers/usersController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.get('/current', authenticate, getCurrent);

export default router;
