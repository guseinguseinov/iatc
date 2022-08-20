import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import generateResponseMessage from '../utils/resGenerate.js';
import UserModel from '../models/User.js';

config();

const jwtSecretKey = process.env.JWT_SEKRET_KEY;

export function generateAccessToken(data) {
    const token = jwt.sign(data, jwtSecretKey, { expiresIn: '12h' });
    return token;
}

export const authenticateUserToken = async (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) return res.status(401).json(generateResponseMessage(401, 'Unauthorized request!', null));

    jwt.verify(accessToken, jwtSecretKey, (err, decoded) => {
        if (err) return res.status(403).json(generateResponseMessage(401, 'Unauthorized request!', null));

        const { exp, iat, id } = decoded;

        if (id != req.params.id) return res.status(403).json(generateResponseMessage(401, 'You can not change or delete other users', null));


        if (exp < Date.now() / 1000) {
            return res.status(401).json(generateResponseMessage(401, 'Your session has expired', null));
        } else {
            req.user = id;
            next();
        }
    });
}

export const authenticateAdminToken = async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) return res.status(401).json(generateResponseMessage(401, 'Unauthorized request!', null));

    jwt.verify(accessToken, jwtSecretKey, (err, decoded) => {
        if (err) return res.status(403).json(generateResponseMessage(401, 'Unauthorized request!', null));

        const { exp, iat, id, role } = decoded;

        if (role !== "admin") return res.status(403).json(generateResponseMessage(401, 'Unauthorized request!', null));

        if (exp < Date.now() / 1000) {
            return res.status(401).json(generateResponseMessage(401, 'Your session has expired', null));
        }
        else {
            req.user = id;
            next();
        }
    });
}