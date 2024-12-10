import { Router } from 'express';
import userRoutes from './user-route.js';
import thoughtRoutes from './thought-route.js';


const router = Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

export default router;