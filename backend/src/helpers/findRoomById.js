import Room from '../models/room.models.js';

async function findRoomById(id) {
    return Room.findById(id);
}

export default findRoomById;