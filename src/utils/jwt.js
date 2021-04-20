import jwt from "jsonwebtoken";
const secretKey = process.env.APP_SECRET;

// jwt 토큰 발행
export function createToken( userId ) {
    //return jwt.sign({ uid: userId }, secretKey, { expiresIn: '30s' });
    return jwt.sign({ uid: userId }, secretKey); // not time setting
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