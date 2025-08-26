import api from '../lib/api';

export const fetchActiveRooms = async () => await api.get('/api/rooms/active-rooms');
export const checkPlayerRoom = async (roomId) => await api.get('/api/rooms/player-room', roomId);
