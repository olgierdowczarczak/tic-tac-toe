import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import isTokenValid from "../helpers/isTokenValid";
import handlePlayerRoom from "../helpers/handlePlayerRoom";

function ProtectedRoute() {
    const [redirectPath, setRedirectPath] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            const token = localStorage.getItem("token");
            const currentGame = localStorage.getItem("currentGame");
            if (!token || !isTokenValid(token)) setRedirectPath("/logout");
            else {
                if (!currentGame) setRedirectPath(null);
                else await handlePlayerRoom(currentGame, "/rooms", (path) => setRedirectPath(path));
            }

            setLoading(false);
        };

        checkAccess();
    }, []);

    if (loading) return;
    if (redirectPath) return <Navigate to={redirectPath} replace />;

    return <Outlet />;
}

export default ProtectedRoute;
