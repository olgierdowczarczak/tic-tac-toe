import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import removePlayer from "../helpers/removePlayer";

export default function () {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                removePlayer();
            } catch (err) {
                console.error(err);
            } finally {
                navigate("/login");
            }
        };

        logout();
    }, [navigate]);

    return null;
}
