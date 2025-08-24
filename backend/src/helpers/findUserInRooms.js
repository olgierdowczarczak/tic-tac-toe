import mongoose from 'mongoose';
import Room from '../models/room.models.js';

async function findUserInRooms(userId) {
    return Room.findOne({ "players._id": new mongoose.Types.ObjectId(userId), isActive: true });
}

export default findUserInRooms;