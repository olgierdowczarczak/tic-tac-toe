import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                // TODO send info to server
            } catch (err) {
                console.error("Logout error:", err);
            } finally {
                localStorage.clear();
                navigate("/login");
            }
        };

        logout();
    }, [navigate]);

    return null;
}
