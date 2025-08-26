import Room from '../models/room.models.js';

export default async function (id) {
    return Room.findById(id);
};
