import jsonwebtoken from 'jsonwebtoken';

function generateToken(userId) {
    return jsonwebtoken.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export default generateToken;
