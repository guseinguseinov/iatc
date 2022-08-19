import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import generateResponseMessage from '../utils/resGenerate.js';

config();

const jwtSecretKey = process.env.JWT_SEKRET_KEY;

export function generateAccessToken(data) {
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: '90d' });
    return token;
}

export const authenticateUserToken = (req, res, next) => {
    // TODO : WRITE AUTH WITH COOKIES 
    console.log(req.rawHeaders);
    const authHeader = req.rawHeaders;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader, token);
    if (!token) return res.status(401), json(generateResponseMessage(401, 'Unauthorized request!', null));

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) return res.status(403).jons(generateResponseMessage(401, 'Unauthorized request!', null));

        const { exp, iat, ...userData } = decoded;
        if (exp < Date.now() / 1000) {
            return res.status(401).josn(generateResponseMessage(401, 'Your session has expired', null));
        } else {
            req.user = userData;
            next();
        }
    });
}