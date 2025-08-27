import { io } from "socket.io-client";

let socket = io(import.meta.env.VITE_API_SERVER_URL);

const clearSocket = () => {
    if (socket) {
        socket.off();
        socket.disconnect();
    }
    socket = null;
};

export const initSocket = (token) => {
    if (socket) clearSocket();
    
    socket = io(import.meta.env.VITE_API_SERVER_URL, {
        auth: { token: `Bearer ${token}` }
    });
    return socket;
}
export const getSocket = () => socket;
export const removeSocket = () => clearSocket();
