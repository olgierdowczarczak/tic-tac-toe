import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import authenticateRestToken from './src/middleware/auth-rest.middleware.js';
import authenticateSocketToken from './src/middleware/auth-socket.middleware.js';
import handleRoomSockets from './src/sockets/room.sockets.js';
import userRoutes from './src/routes/user.routes.js';
import roomRoutes from './src/routes/room.routes.js';

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 3000;
        const app = express();
        app.use(cors());
        app.use(express.json());
        app.use('/api/users', userRoutes);
        app.use('/api/rooms', authenticateRestToken, roomRoutes);
        app.get((req, res) => res.json({ message: 'OK' }));

        const server = http.createServer(app);
        const io = new Server(server, { cors: { origin: process.env.ALLOWED_HOST || 'http://localhost:5173' } });
        io.use(authenticateSocketToken);
        io.on('connection', (socket) => {
            handleRoomSockets(io, socket);
        });

        server.listen(PORT, () => console.log('Server is running on port:', PORT));
    })
    .catch(err => console.error(err));
    