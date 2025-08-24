import api from './api';

export const fetchActiveRooms = async () => {
    return await api.get('/api/rooms/active-rooms');
};

export const createRoom = async () => {
    return await api.post('/api/rooms/create');
};

export const joinRoom = async (roomId, password) => {
    return await api.post(`/api/rooms/join/${roomId}`, password);
};

export const deleteRoom = async (roomId) => {
    return await api.post(`/api/rooms/delete/${roomId}`);
};

export const leaveRoom = async (roomId) => {
    return await api.post(`/api/rooms/leave/${roomId}`);
};