import Room from '../models/room.models.js';
import findUserInRooms from '../helpers/findUserInRooms.js'

export async function activeRooms(req, res) {
    try {
        const rooms = await Room.find({ isActive: true });
        return res.json(rooms);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function checkPlayerInRoom(req, res) {
    try {
        const room = await findUserInRooms(String(req.user._id));
        return res.json(room)
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
