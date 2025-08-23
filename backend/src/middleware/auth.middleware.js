import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.models.js';

export default async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });

    try {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        req.user = user;
        next();   
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}