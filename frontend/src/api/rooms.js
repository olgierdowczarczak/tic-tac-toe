import { getApi } from "../lib/api";

export const fetchActiveRooms = async () => await getApi().get("/api/rooms/active-rooms");
export const checkPlayerRoom = async (roomId) => await getApi().get("/api/rooms/player-room", roomId);
