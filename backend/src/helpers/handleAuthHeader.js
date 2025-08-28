import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.models.js';

export default async function (data) {
    const authHeader = data;
    if (!authHeader) throw new Error('Authorization header missing or invalid');

    const token = authHeader.split(' ')[1];
    if (!token) throw new Error('Token missing');

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('_id username');
    if (!user) throw new Error('User not found');

    return user;
}
