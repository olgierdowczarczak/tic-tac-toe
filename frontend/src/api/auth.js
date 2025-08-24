import api from './api';

export const login = async (credentials) => {
    const res = await api.post('/api/users/login', credentials);
    localStorage.setItem('id', res.data._id);
    localStorage.setItem('token', res.data.token);
    return res;
};

export const register = async (credentials) => {
    const res = await api.post('/api/users/register', credentials);
    localStorage.setItem('id', res.data._id);
    localStorage.setItem('token', res.data.token);
    return res;
};