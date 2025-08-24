import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const roomSchema = new mongoose.Schema({
    owner: { type: String, required: true },
    isActive: { type: Boolean, required: true, default: true },
    state: { type: Number, required: true, default: 0 },
    players: { type: Array, required: true },
    password: { type: String, default: '' }
}, { versionKey: false });
roomSchema.methods.hashPassword = async function () { return bcrypt.hash(this.password, 10); }
roomSchema.methods.checkPassword = async function (password) { return bcrypt.compare(password, this.password) };

export default mongoose.model('Room', roomSchema);