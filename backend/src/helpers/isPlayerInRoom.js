export default function (room, userId) {
    return room.players.some(player => String(player._id) === String(userId));
};
