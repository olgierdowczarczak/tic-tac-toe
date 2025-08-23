import { useEffect, useState } from "react";
import api from "../api";

function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await api.get("/api/rooms/active-rooms");
            setRooms(res.data);
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddRoom = async () => {
        setError(null);
        setLoading(true);
        try {
            await api.post("/api/rooms/create");
            await fetchRooms();
        } catch (err) {
            setError(err.response?.data?.error || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Rooms page</h1>

            {error && <div style={{ color: "red" }}>{error}</div>}

            {loading && <p>Loading...</p>}

            <ul>
                {rooms.map((room) => (
                    <li key={room._id}>{room._id}</li>
                ))}
            </ul>

            <button onClick={handleAddRoom} disabled={loading}>
                {loading ? "Processing..." : "Add"}
            </button>
        </>
    );
}

export default RoomsPage;
