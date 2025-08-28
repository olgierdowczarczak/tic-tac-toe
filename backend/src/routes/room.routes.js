import { Router } from 'express';
import { activeRooms, checkPlayerInRoom } from '../controllers/room.controllers.js';

const router = Router();
router.get('/active-rooms', activeRooms);
router.get('/player-room', checkPlayerInRoom);

export default router;
