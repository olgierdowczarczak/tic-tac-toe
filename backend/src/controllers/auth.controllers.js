import User from '../models/user.models.js';
import generateToken from '../helpers/generateToken.js';

export async function register(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already taken' });
        }

        const user = new User({ username, password });
        user.password = await user.hashPassword(password);
        await user.save();

        const token = generateToken(user._id);
        res.json({ _id: user._id, token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);
        res.json({ _id: user._id, token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}
