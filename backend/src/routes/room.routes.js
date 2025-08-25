import { Router } from 'express';
import { activeRooms } from '../controllers/room.controllers.js';

const router = Router();
router.get('/active-rooms', activeRooms);

export default router;
