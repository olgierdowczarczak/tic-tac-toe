import { useEffect, useState } from "react";
import { fetchActiveRooms, createRoom, joinRoom, deleteRoom, leaveRoom } from "../api/rooms";

function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const USER_ID = localStorage.getItem("id");

    const handleRequest = async (callback) => {
        setError(null);
        setLoading(true);
        try {
            await callback();
            await fetchRooms();
        } catch (err) {
            setError(err.response?.data?.message || err.error || "Unexpected error");
        } finally {
            setLoading(false);
        }
    };

    const fetchRooms = async () => {
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
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <>
            <h1>Rooms page</h1>

            {error && <div style={{ color: "red" }}>{error}</div>}
            {loading && <p>Loading...</p>}

            <table>
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Players</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => {
                        const isOwner = USER_ID === room.owner;
                        const isPlayer = room.players.some((p) => p._id === USER_ID);
                        const isFull = room.players.length === 2;
                        const isStarted = room.state;

                        return (
                            <tr key={room._id}>
                                <td>{room.players[0]?.username || "Unknown"}</td>
                                <td>{room.players.length} / 2</td>
                                <td>
                                    <button
                                        onClick={() => handleRequest(() => joinRoom(room._id, ""))}
                                        disabled={isFull || isStarted || isPlayer}
                                    >
                                        Join
                                    </button>
                                </td>
                                <td>
                                    {isOwner && !isStarted && (
                                        <button onClick={() => handleRequest(() => deleteRoom(room._id))}>
                                            Delete
                                        </button>
                                    )}
                                    {!isOwner && isPlayer && (
                                        <button onClick={() => handleRequest(() => leaveRoom(room._id))}>
                                            Leave
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <button onClick={() => handleRequest(createRoom)} disabled={loading}>
                {loading ? "Processing..." : "Add"}
            </button>
        </>
    );
}

export default RoomsPage;
