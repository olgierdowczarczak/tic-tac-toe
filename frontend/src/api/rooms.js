import { getApi } from "../lib/api";

export const fetchActiveRooms = async () => {
    const res = await getApi().get("/api/rooms/active-rooms");
    return res.data;
};
export const checkPlayerRoom = async (roomId) => {
    const res = await getApi().get("/api/rooms/player-room", roomId);
    return res.data;
};
