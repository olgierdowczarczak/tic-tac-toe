import handleAuthHeader from '../helpers/handleAuthHeader.js'

export default async function authMiddleware(socket, next) {
    try {
        const user = await handleAuthHeader(socket.handshake.auth.token);
        socket.user = user;
        next();
    } catch (err) {
        next(new Error(err.message));
    }
}
