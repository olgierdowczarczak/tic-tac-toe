import handleAuthHeader from '../helpers/handleAuthHeader.js'

export default async function authMiddleware(req, res, next) {
    try {
        const user = await handleAuthHeader(req.headers['authorization']);
        req.user = user;
        next();
    } catch (err) {
        next(new Error(err.message));
    }
}
