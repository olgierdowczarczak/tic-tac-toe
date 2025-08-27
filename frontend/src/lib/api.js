import axios from "axios";

let api = axios.create({
    baseURL: import.meta.env.VITE_API_SERVER_URL
});

export const updateApi = (token) => {
    if (!api) return null;

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
export const getApi = () => api;
export const removeApiHeaders = () => delete api.defaults.headers.common["Authorization"];
