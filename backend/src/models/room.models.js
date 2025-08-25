import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    state: { type: Number, required: true, default: 0 },
    players: { type: Array, required: true },
}, { versionKey: false });

export default mongoose.model('Room', roomSchema);
