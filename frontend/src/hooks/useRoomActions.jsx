import { getSocket } from "../lib/socket";

export default function (setError) {
    const socket = getSocket();
    const emitWithError = (event, payload = {}) => {
        socket.emit(event, payload, (res) => {
            if (res) setError(res);
        });
    };

    return {
        joinRoom: (roomId) => emitWithError("room:join", { roomId }),
        leaveRoom: (roomId) => emitWithError("room:leave", { roomId }),
        deleteRoom: (roomId) => emitWithError("room:delete", { roomId }),
        startRoom: (roomId) => emitWithError("room:start", { roomId }),
        createRoom: () => socket.emit("room:create", (res) => res && setError(res))
    };
}
