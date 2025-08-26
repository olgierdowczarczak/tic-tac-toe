import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import isTokenValid from "../helpers/isTokenValid";
import handlePlayerRoom from "../helpers/handlePlayerRoom";

function ProtectedRoute() {
    const [redirectPath, setRedirectPath] = useState(null);
    const token = localStorage.getItem("token");
    const currentGame = localStorage.getItem("currentGame");

    const verifyRoom = useCallback(async () => {
        handlePlayerRoom(currentGame, "/rooms", (path) => setRedirectPath(path));
    }, [currentGame]);

    useEffect(() => {
        if (!isTokenValid(token)) return setRedirectPath("/logout");

        verifyRoom();
    }, [token, currentGame, verifyRoom]);

    if (redirectPath) return <Navigate to={redirectPath} replace />;
    
    return <Outlet />;
}

export default ProtectedRoute;
