import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import authenticateToken from './src/middleware/auth.middleware.js';
import userRoutes from './src/routes/user.routes.js';
import roomRoutes from './src/routes/room.routes.js';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(express.json());

        app.use('/api/users', userRoutes);
        app.use('/api/rooms', authenticateToken, roomRoutes);
        app.get('/', (req, res) => res.json({ message: 'OK' }));

        const PORT = process.env.PORT || 3000;
        const server = createServer(app);
        server.listen(PORT, () => console.log('Server is running on port:', PORT));
    })
    .catch(err => console.error('Error: ', err));