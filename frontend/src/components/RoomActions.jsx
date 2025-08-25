function RoomActions({ room, userId, loading, actions }) {
    const { joinRoom, leaveRoom, deleteRoom } = actions;
    const isOwner = userId === room.owner;
    const isPlayer = room.players.some((p) => p._id === userId);
    const isFull = room.players.length === 2;
    const isStarted = room.state;

    return (
        <>
            <td>
                <button
                    onClick={() => joinRoom(room._id)}
                    disabled={isFull || isStarted || isPlayer || loading}
                >
                    Join
                </button>
            </td>
            <td>
                {isOwner && !isStarted && (
                    <button onClick={() => deleteRoom(room._id)}>Delete</button>
                )}
                {!isOwner && isPlayer && (
                    <button onClick={() => leaveRoom(room._id)}>Leave</button>
                )}
            </td>
        </>
    );
}

export default RoomActions;
