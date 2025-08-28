import { checkPlayerRoom } from "../api/rooms";

export default async function (currentGame, redirect, cb) {
    try {
        const room = await checkPlayerRoom(currentGame);
        if (!room || room._id !== currentGame) {
            localStorage.removeItem("currentGame");
            return cb(redirect);
        }

        cb(room.state ? `/rooms/${room._id}` : null)
    } catch (err) {
        cb("/");
    }
}
