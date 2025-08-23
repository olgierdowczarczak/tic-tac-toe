import Room from '../../models/room.models.js';

async function findActiveRoomByUser(userId) {
    return Room.findOne({ players: { $in: [userId] }, isActive: true });
}

export default findActiveRoomByUser;