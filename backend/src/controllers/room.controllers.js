import Room from '../models/room.models.js';
import findActiveRoomByUser from '../utils/helpers/findActiveRoomByUser.js';
import findRoomById from '../utils/helpers/findRoomById.js';

export async function createRoom(req, res) {
    try {
        const userId = req.user._id;
        if (await findActiveRoomByUser(userId)) return res.status(403).json({ message: 'Already in room' });

        const room = new Room({
            owner: userId,
            ...req.body,
            players: [userId, null]
        });
        if (room.password) room.password = await room.hashPassword();
        await room.save();
        return res.json({ roomId: room._id });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function activeRooms(req, res) {
    try {
        return res.send(await Room.find({ isActive: true }));
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function joinRoom(req, res) {
    try {
        const room = await findRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not exists' });
        if (!room.isActive) return res.status(403).json({ message: 'Room is not active' });
        if (room.players.every(player => typeof player === 'string')) return res.status(403).json({ message: 'Room is full' });
        if (room.password && room.checkPassword(req.body) === false) return res.status(403).json({ message: 'Password is invalid' });

        const userId = req.user._id;
        if (await findActiveRoomByUser(userId)) return res.status(403).json({ message: 'Already in room' });
        room.players[1] = userId;

        await room.save();
        return res.json(room);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function leaveRoom(req, res) {
    try {
        const room = await findRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not exists' });
        if (!room.isActive) return res.status(403).json({ message: 'Room is not active' });

        const userId = String(req.user._id);
        if (!room.players.some(playerId => String(playerId) === userId)) return res.status(403).json({ message: 'Not in this room' });

        if (userId === String(room.owner)) room.isActive = false;
        else room.players[1] = null;

        await room.save();
        return res.json(room);
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}