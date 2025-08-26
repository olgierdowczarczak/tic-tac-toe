import Room from '../models/room.models.js';
import findUserInRooms from '../helpers/findUserInRooms.js';
import isPlayerInRoom from '../helpers/isPlayerInRoom.js';
import findRoomById from '../helpers/findRoomById.js';

export default function handleRoomSockets(io, socket) {
    const getUserIdAsString = () => String(socket.user._id);
    const withErrorHandler = (handler) => async (...args) => {
        const callback = args[args.length - 1];
        try {
            await handler(...args);
        } catch (err) {
            if (typeof callback === "function") callback(err.message);
            else console.error(err.message);
        }
    };

    socket.on('room:create', withErrorHandler(async (callback) => {
        const userId = getUserIdAsString();
        if (await findUserInRooms(userId)) throw new Error('Already in room');

        const room = new Room({
            owner: userId,
            players: [socket.user]
        });
        await room.save();

        const roomIndex = String(room._id);
        socket.join(roomIndex);
        io.emit('room:refresh');
        callback?.(null, true);
    }));

    socket.on('room:join', withErrorHandler(async ({ roomId }, callback) => {
        const room = await findRoomById(roomId);
        if (!room) throw new Error('Room does not exist');
        if (!room.isActive) throw new Error('Room is not active');
        if (room.players.length === 2) throw new Error('Room is full');

        if (await findUserInRooms(getUserIdAsString())) throw new Error('Already in room');

        room.players.push(socket.user);
        await room.save();

        const roomIndex = String(room._id);
        socket.join(roomIndex);
        io.emit('room:refresh');
        callback?.(null, true);
    }));

    socket.on('room:leave', withErrorHandler(async ({ roomId }, callback) => {
        const room = await findRoomById(roomId);
        if (!room) throw new Error('Room does not exist');
        if (!room.isActive) throw new Error('Room is not active');

        const userId = getUserIdAsString();
        if (!isPlayerInRoom(room, userId)) throw new Error('Not in this room');
        if (userId === String(room.owner)) throw new Error('Owner can not leave room');

        room.players = room.players.filter(p => String(p._id) !== userId);
        await room.save();

        const roomIndex = String(room._id);
        socket.leave(roomIndex);
        io.emit('room:refresh');
        callback?.(null, true);
    }));

    socket.on('room:delete', withErrorHandler(async ({ roomId }, callback) => {
        const room = await findRoomById(roomId);
        if (!room) throw new Error('Room does not exist');
        if (!room.isActive) throw new Error('Room is not active');
        if (room.state) throw new Error('Can not delete this room');

        if (getUserIdAsString() !== String(room.owner)) throw new Error('Not an owner');

        room.isActive = false;
        room.state = 0;
        await room.save();

        const roomIndex = String(room._id);
        const clients = await io.in(roomIndex).fetchSockets();
        clients.forEach(client => client.leave(roomIndex));

        io.emit('room:refresh');
        callback?.(null, true);
    }));

    socket.on('room:start', withErrorHandler(async ({ roomId }, callback) => {
        const room = await findRoomById(roomId);
        if (!room) throw new Error('Room does not exist');
        if (!room.isActive) throw new Error('Room is not active');
        if (room.state) throw new Error('Can not delete this room');

        const userId = getUserIdAsString();
        if (userId !== String(room.owner)) throw new Error('Not an owner');

        room.state = 1;
        await room.save();

        const roomIndex = String(room._id);
        io.to(roomIndex).emit('game:start', roomIndex);
        callback?.(null, true);
    }));
};
