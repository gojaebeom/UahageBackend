import jwt from "jsonwebtoken";
const secretKey = process.env.APP_SECRET;

// jwt 토큰 발행
export function createToken( userId, roles ) {
    //return jwt.sign({ uid: userId }, secretKey, { expiresIn: '30s' });
    // roles : 'SUPER' / 'MANAGER' / 'GENERAL' / 'USER'
    return jwt.sign({ uid: userId, roles: roles }, secretKey); // not time setting
}

// jwt 토큰 해석
export function verifyToken( token ) {
    let decoded;
    try {
        // verify를 통해 값 decode!
        decoded = jwt.verify(token, secretKey);
    } catch (err) {
        if (err.message === 'jwt expired') {
            console.log('expired token');
            return "EXPIRED";
        } else if (err.message === 'invalid token') {
            console.log('invalid token');
            return "INVALID";
        } else {
            console.log("invalid token");
            return "INVALID";
        }
    }
    return decoded;
}