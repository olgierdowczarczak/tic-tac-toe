import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.models.js';

export default async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token missing' });
        }

        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('_id username');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}