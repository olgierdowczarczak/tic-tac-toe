import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../lib/socket";

export default function () {
    const navigate = useNavigate();
    const handleStartGame = (roomId) => {
        localStorage.setItem("currentGame", roomId);
        navigate(`/rooms/${roomId}`);
    };

    useEffect(() => {
        socket.on("game:start", handleStartGame);
        return () => socket.off("game:start", handleStartGame);
    }, []);
}
