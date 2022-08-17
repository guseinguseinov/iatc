import mongoose from "mongoose";
// import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

const cryptoSalt = Number(process.env.CRYPTO_SALT);

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
        select: false
    },
    profilePicture: String,
    role: {
        type: String,
        default: 'user',
    }
});

UserSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, cryptoSalt);
    // this.password = crypto
    //     .pbkdf2Sync(this.password, cryptoSalt, 10000, 64, 'sha512')
    //     .toString('base64');
    next();
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;