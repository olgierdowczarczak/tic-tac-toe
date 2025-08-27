import { decodeToken } from "react-jwt";

export default function (token) {
    if (!token) return false;

    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) return false;

        const exp = decoded.exp * 1000;
        return exp > Date.now();
    } catch {
        return false;
    }
};
