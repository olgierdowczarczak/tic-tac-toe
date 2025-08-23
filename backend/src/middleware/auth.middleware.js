import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.models.js';

export default async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
        const user = await User.findById(jsonwebtoken.verify(token, process.env.JWT_SECRET).id);
        req.user = user;
        next();   
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}