import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { versionKey: false });
userSchema.methods.hashPassword = async function () { return bcrypt.hash(this.password, 10); }
userSchema.methods.checkPassword = async function (password) { return bcrypt.compare(password, this.password) };

export default mongoose.model('User', userSchema);
