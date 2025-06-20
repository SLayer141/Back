import { Router } from 'express';
import { signup } from '../controller/UserController';

const router = Router();

router.post('/api/signup', signup);

export default router; 