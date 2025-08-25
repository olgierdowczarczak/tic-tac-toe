import { useEffect, useState, useCallback } from "react";
import { fetchActiveRooms } from "../api/rooms";
import socket from "../lib/socket";

export function useRooms() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRooms = useCallback(async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetchActiveRooms();
            setRooms(res.data);
        } catch (err) {
            setError(err.response?.data?.message || err.error || "Failed to fetch rooms");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        socket.on("room:refresh", fetchRooms);
        fetchRooms();
        return () => socket.off("room:refresh", fetchRooms);
    }, [fetchRooms]);

    return { rooms, loading, error, setError, fetchRooms };
}
