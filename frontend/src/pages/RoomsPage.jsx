import useRooms from "../hooks/useRooms";
import useRoomActions from "../hooks/useRoomActions";
import RoomActions from "../components/RoomActions";
import useGameStartListener from "../hooks/useGameStartListener";

export default function () {
    const userId = localStorage.getItem("id");
    const { rooms, loading, error, setError } = useRooms();
    const actions = useRoomActions(setError);
    useGameStartListener();

    return (
        <div>
            <h1>Rooms</h1>

            {error && <div style={{ color: "red" }}>{error}</div>}
            
            {loading && <p>Loading...</p>}

            <table>
                <thead>
                    <tr>
                        <th>Owner</th>
                        <th>Players</th>
                        <th colSpan="3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr key={room._id}>
                            <td>{room.players[0]?.username || "Unknown"}</td>
                            <td>{room.players.length} / 2</td>
                            <RoomActions
                                room={room}
                                userId={userId}
                                loading={loading}
                                actions={actions}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={actions.createRoom} disabled={loading}>
                {loading ? "Processing..." : "Create Room"}
            </button>
        </div>
    );
}
