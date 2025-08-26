import { checkPlayerRoom } from "../api/rooms";

export default async function (currentGame, redirect, cb) {
    try {
        const res = await checkPlayerRoom(currentGame);
        const room = res.data;
        if (!room || room._id !== currentGame) {
            localStorage.removeItem("currentGame");
            return cb(redirect);
        }

        cb(room.state ? `/rooms/${room._id}` : null)
    } catch (err) {
        cb("/");
    }
}
