import { io } from "socket.io-client";

let socket = null;

export const setSocketToken = (token) => {
    if (socket) {
        socket.auth = { token: `Bearer ${token}` };
        socket.connect();
    }
}

export const getSocket = () => {
    if (!socket) {
        socket = io(import.meta.env.VITE_API_SERVER_URL, { autoConnect: false });

        const token = localStorage.getItem("token");
        if (token) socket.auth = { token: `Bearer ${token}` };

        socket.connect();
    }
    return socket;
};

export const removeSocket = () => {
    if (!socket) return;

    socket.disconnect();
    socket = null;
};
