function RoomActions({ room, userId, loading, actions }) {
    const { joinRoom, leaveRoom, deleteRoom, startRoom } = actions;
    const isOwner = userId === room.owner;
    const isPlayer = room.players.some((p) => p._id === userId);
    const isFull = room.players.length === 2;
    const isStarted = room.state;

    const handleJoin = () => joinRoom(room._id);
    const handleLeave = () => leaveRoom(room._id);
    const handleDelete = () => deleteRoom(room._id);
    const handleStart = () => startRoom(room._id);
    const renderOwnerActions = () => {
        if (!isOwner) return null;
        if (isStarted) return null;
        return (
            <>
                <button onClick={handleDelete}>Delete</button>
                {isFull && <button onClick={handleStart}>Start</button>}
            </>
        );
    };

    const renderPlayerActions = () => {
        if (isOwner) return null;
        if (isPlayer) return <button onClick={handleLeave}>Leave</button>;
    };

    return (
        <>
            <td>
                <button
                    onClick={handleJoin}
                    disabled={isFull || isStarted || isPlayer || loading}
                >
                    Join
                </button>
            </td>
            <td>
                {renderOwnerActions()}
                {renderPlayerActions()}
            </td>
        </>
    );
}

export default RoomActions;
