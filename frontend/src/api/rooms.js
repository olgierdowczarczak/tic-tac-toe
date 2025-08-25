import api from '../lib/api';

export const fetchActiveRooms = async () => {
    return await api.get('/api/rooms/active-rooms');
};
