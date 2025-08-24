import { Router } from 'express';
import { createRoom, activeRooms, joinRoom, leaveRoom, deleteRoom } from '../controllers/room.controllers.js';

const router = Router();
router.post('/create', createRoom);
router.get('/active-rooms', activeRooms);
router.post('/join/:id', joinRoom);
router.post('/leave/:id', leaveRoom);
router.post('/delete/:id', deleteRoom);

export default router;