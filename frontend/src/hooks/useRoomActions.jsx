import socket from "../lib/socket";

export function useRoomActions(setError) {
    const joinRoom = (roomId) => {
        socket.emit("room:join", { roomId }, (res) => res && setError(res));
    };

    const leaveRoom = (roomId) => {
        socket.emit("room:leave", { roomId }, (res) => res && setError(res));
    };

    const deleteRoom = (roomId) => {
        socket.emit("room:delete", { roomId }, (res) => res && setError(res));
    };

    const createRoom = () => {
        socket.emit("room:create", (res) => res && setError(res));
    };

    const startRoom = (roomId) => {
        socket.emit("room:start", { roomId }, (res) => res && setError(res));
    };

    return { joinRoom, leaveRoom, deleteRoom, createRoom, startRoom };
}
