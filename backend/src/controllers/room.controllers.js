import Room from '../models/room.models.js';

export async function activeRooms(req, res) {
    try {
        const rooms = await Room.find({ isActive: true });
        return res.json(rooms);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
