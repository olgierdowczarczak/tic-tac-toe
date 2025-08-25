import { io } from 'socket.io-client';

const token = localStorage.getItem("token");
const socket = io(import.meta.env.VITE_API_SERVER_URL, { auth: { token: `Bearer ${token}` } });

export default socket;
