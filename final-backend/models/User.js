import mongoose from "mongoose";
// import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

const cryptoSalt = Number(process.env.CRYPTO_SALT);

const checkUniquePhone = async value => {
    if (value) {
        const user = await UserModel.findOne({ phone: value });
        if (user) return false;
    }

    return true;
}

const checkUniqueEmail = async value => {
    if (!value) return false;
    const user = await UserModel.findOne({ email: value });
    if (user) return false;
    return true;
}

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'User first name required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'User last name required'],
        trim: true,
    },
    phone: {
        type: String,
        validate: {
            validator: checkUniquePhone,
            message: props => `This phone number : ${props.value} exists`,
        },
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        validate: {
            validator: checkUniqueEmail,
            message: props => `This email : ${props.value} exists`,
        },
        required: [true, 'User email required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'User password required'],
        select: false
    },
    profilePicture: String,
    role: {
        type: String,
        default: 'user',
    },
    // wishlist: [{
    //     type: 'ObjectId',
    //     ref: 'whislists',
    // }],
    // cart: [{
    //     cart: 'ObjectId',
    //     ref: 'carts',
    // }]
});

UserSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, cryptoSalt);
    // this.password = crypto
    //     .pbkdf2Sync(this.password, cryptoSalt, 10000, 64, 'sha512')
    //     .toString('base64');
    next();
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;