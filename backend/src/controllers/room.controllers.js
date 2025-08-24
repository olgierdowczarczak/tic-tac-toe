import Room from '../models/room.models.js';
import findUserInRooms from '../helpers/findUserInRooms.js';
import findRoomById from '../helpers/findRoomById.js';
import isPlayerInRoom from '../helpers/isPlayerInRoom.js';
import getPublicRoom from '../utils/getPublicRoom.js';

export async function createRoom(req, res) {
    try {
        const userId = req.user._id;
        if (await findUserInRooms(userId)) {
            return res.status(403).json({ message: 'Already in room' });
        }

        const username = req.user.username;
        const room = new Room({
            owner: userId,
            ...req.body,
            players: [{ _id: userId, username }]
        });

        if (room.password) {
            room.password = await room.hashPassword();
        }

        await room.save();
        return res.json(await getPublicRoom(room));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function activeRooms(req, res) {
    try {
        const rooms = await Room.find({ isActive: true });
        const publicRooms = await Promise.all(rooms.map(r => getPublicRoom(r)));
        return res.json(publicRooms);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function joinRoom(req, res) {
    try {
        const room = await findRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room does not exist' });
        if (!room.isActive) return res.status(403).json({ message: 'Room is not active' });

        const userId = req.user._id;
        if (await findUserInRooms(userId)) {
            return res.status(403).json({ message: 'Already in room' });
        }

        if (room.players.length === 2) return res.status(403).json({ message: 'Room is full' });

        if (room.password) {
            const isValid = await room.checkPassword(req.body.password || '');
            if (!isValid) {
                return res.status(403).json({ message: 'Password is invalid' });
            }
        }
        
        const username = req.user.username;
        room.players.push({ _id: userId, username });
        await room.save();
        return res.json(await getPublicRoom(room));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function leaveRoom(req, res) {
    try {
        const room = await findRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room does not exist' });
        if (!room.isActive) return res.status(403).json({ message: 'Room is not active' });

        const userId = String(req.user._id);
        if (!isPlayerInRoom(room, userId)) {
            return res.status(403).json({ message: 'Not in this room' });
        }

        if (userId === String(room.owner)) {
            room.isActive = false;
        } else {
            room.players = room.players.filter(player => String(player._id) !== userId);
        }

        await room.save();
        return res.json();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}

export async function deleteRoom(req, res) {
    try {
        const room = await findRoomById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room does not exist' });
        if (!room.isActive) return res.status(403).json({ message: 'Room is not active' });
        if (room.state) return res.status(403).json({ message: 'Can not delete this room' });

        const userId = String(req.user._id);
        if (userId !== String(room.owner)) res.status(403).json({ message: 'Not an owner' });

        room.isActive = false;
        room.state = 0;
        await room.save();
        
        return res.json();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
}