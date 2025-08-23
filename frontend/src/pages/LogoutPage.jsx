import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                // TODO send info to server
            } catch (err) {
                console.error("Logout error:", err);
            } finally {
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        logout();
    }, [navigate]);

    return null;
}

export default LogoutPage;
