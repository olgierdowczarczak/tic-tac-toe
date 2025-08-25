import { Navigate, Outlet } from "react-router-dom";
import { decodeToken } from "react-jwt";

const isTokenValid = token => {
    if (!token) return false;

    try {
        const decoded = decodeToken(token);
        return decoded.exp * 1000 > Date.now();
    } catch {
        return false;
    }
};

export default function PrivateRoute() {
    const token = localStorage.getItem("token");
    return isTokenValid(token) ? <Outlet /> : <Navigate to="/login" />;
}
