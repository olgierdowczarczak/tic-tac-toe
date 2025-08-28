import { getApi } from "../lib/api";

export const register = async (credentials) => {
    const res = await getApi().post("/api/users/register", credentials);
    return res.data;
};

export const login = async (credentials) => {
    const res = await getApi().post("/api/users/login", credentials);
    return res.data;
};

export const logout = async () => {
    await getApi().post("/api/users/logout");
};
