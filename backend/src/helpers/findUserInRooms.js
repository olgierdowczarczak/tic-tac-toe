import mongoose from 'mongoose';
import Room from '../models/room.models.js';

export default async function (userId) {
    return Room.findOne({ "players._id": new mongoose.Types.ObjectId(userId), isActive: true });
};
