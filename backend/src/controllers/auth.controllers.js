import jsonwebtoken from 'jsonwebtoken';
import User from '../models/user.models.js';

export async function register(req, res) {
    try {
        const user = new User(req.body);
        user.password = await user.hashPassword();
        await user.save();

        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export async function login(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user || !(await user.checkPassword(req.body.password))) return res.status(401).json({ error: 'Invalid credentials' })

        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}