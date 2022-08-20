import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import { config } from 'dotenv';
config();

const cryptoSalt = Number(process.env.CRYPTO_SALT);

const checkUniqueEmail = async value => {
    if (!value) return false;
    const user = await AdminModel.findOne({ email: value });
    if (user) return false;
    return true;
}

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: checkUniqueEmail,
            message: props => `This email : ${props.value} exists`,
        },
        required: [true, 'Admin email required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Admin password required'],
        select: false
    },
    role: {
        type: String,
        default: 'admin',
    }
});


AdminSchema.methods.correctPassword = async function (candidatePassword, adminPassword) {
    return await bcrypt.compare(candidatePassword, adminPassword);
}

AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, cryptoSalt);
    // this.password = crypto
    //     .pbkdf2Sync(this.password, cryptoSalt, 10000, 64, 'sha512')
    //     .toString('base64');
    next();
});

const AdminModel = mongoose.model('admins', AdminSchema);

export default AdminModel;