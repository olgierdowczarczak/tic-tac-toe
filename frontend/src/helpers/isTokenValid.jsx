import { decodeToken } from "react-jwt";

export default function (token) {
    if (!token) return false;

    try {
        const decoded = decodeToken(token);
        if (!decoded || !decoded.exp) return false;

        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};
