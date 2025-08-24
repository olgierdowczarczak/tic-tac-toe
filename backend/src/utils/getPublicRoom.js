async function getPublicRoom(room) {
    return {
        _id: room._id,
        owner: room.owner,
        state: room.state,
        players: room.players,
        isPassword: room.password ? true : false
    }
}

export default getPublicRoom;