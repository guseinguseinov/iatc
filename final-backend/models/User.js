import mongoose from "mongoose";
import crypto from 'crypto';
import { config } from 'dotenv';
config();

const cryptoSalt = process.env.CRYPTO_SALT

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: String,
    role: {
        type: String,
        default: 'user',
    }
});

UserSchema.pre('save', next => {
    this.password = crypto
        .pbkdf2Sync(this.password, cryptoSalt, 10000, 64, 'sha512')
        .toString('base64');

    next();
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;