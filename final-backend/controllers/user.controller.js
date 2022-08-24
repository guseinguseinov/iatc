import fs from 'fs';
import crypto from 'crypto';
import bcrypt from 'bcrypt'
import { config } from 'dotenv';
config();

import { generateAccessToken } from "../middleware/auth.js";
import UserModel from "../models/User.js";
import PasswordResetModel from '../models/passwordReset.js';
import generateResponseMessage from "../utils/resGenerate.js";
import transport from '../utils/emailSender.js';

const cryptoSalt = Number(process.env.CRYPTO_SALT);

const userCtrl = {
    async getAllUsers(req, res) {
        const users = await UserModel.find();
        if (!users) {
            return res.status(400).json(generateResponseMessage(400, "There is no users", null))
        }
        res.status(200).json(generateResponseMessage(200, null, users));
    },
    async getUser(req, res) {
        const { id } = req.params;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(400).json(generateResponseMessage(400, "User not found", null))
        }
        res.status(200).json(generateResponseMessage(200, null, user));
    },
    async register(req, res, next) {
        if (req.file) {
            var { path } = req.file;
        }
        const { password, firstName, lastName, phone, email } = req.body;

        const newUser = await UserModel({
            firstName,
            lastName,
            phone,
            email,
            profilePicture: path,
            password
        });

        await newUser.save();

        const token = generateAccessToken({ id: newUser._id });
        res.cookie('accessToken', token, {
            maxAge: 60 * 60 * 12 * 1000,
            httpOnly: true,
        });

        res.status(201).json(generateResponseMessage(201, 'New User created', token));
    },
    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(generateResponseMessage(400, 'Please provide email and password', null));
        }

        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json(generateResponseMessage(401, 'Incorrect email or password', null));
        }

        const correct = await user.correctPassword(password, user.password);

        if (!correct) {
            return res.status(401).json(generateResponseMessage(401, 'Incorrect email or password', null));
        }

        const token = generateAccessToken({ id: user._id });

        res.cookie('accessToken', token, {
            maxAge: 60 * 60 * 12 * 1000,
            httpOnly: true,
        });

        res.status(200).json(generateResponseMessage(200, null, token));
    },
    async changeUserInfo(req, res) {
        const { email, phone } = req.body;

        if (email) {
            const user = await UserModel.findOne({ email });
            if (user) return res.status(409).json(generateResponseMessage(409, 'User email already exists', null));
        }

        if (phone) {
            const user = await UserModel.findOne({ phone });
            if (user) return res.status(409).json(generateResponseMessage(409, 'User phone already exists', null));
        }

        if (req.file) {
            const user = await UserModel.findById(req.params.id);
            fs.unlinkSync(user.profilePicture);
            await UserModel.findByIdAndUpdate(req.params.id, {
                profilePicture: req.file.path,
                ...req.body,
            });
        }
        else {
            await UserModel.findByIdAndUpdate(req.params.id, req.body);
        }

        res.status(200).json(generateResponseMessage(200, 'User info updated', null));
    },
    async deleteUser(req, res) {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json(generateResponseMessage(404, 'User no longer exists', null));

        fs.unlinkSync(user.profilePicture);
        // await UserModel.findByIdAndDelete(req.params.id);
        res.status(404).json(generateResponseMessage(404, 'User deleted successfully', null)); // when status code is 204 res message not displayed
    },
    async requestPasswordReset(req, res) {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).json(generateResponseMessage(404, 'User no longer exists', null));

        const token = crypto.randomBytes(32).toString('base64url');

        const passwordReset = await PasswordResetModel({
            user: user._id,
            resetToken: token,
        });

        await passwordReset.save();

        const linkToResetPasswordPage = 'http://localhost:8080/users/password/' + token;

        let mail = await transport.sendMail({
            from: 'iTicket api <noreply@iticket.info>',
            to: email,
            subject: "Password Reset",
            text:
                `oh, look like you forgot your password.
                To get reset password use link below
                ${linkToResetPasswordPage}
                `,
            html:
                `
            <h1>Password Reset</h1>
            <p> 
                oh, look like you forgot your password.
                To get reset password use link below
            </p>                  
            <a href=${linkToResetPasswordPage} target="_blank">Reset Password</a>
            `
        })

        res.status(200).json(generateResponseMessage(200, 'Email sent to your address to reset password', null));

    },
    async resetPassword(req, res) {
        const { newPassword, resetToken } = req.body;

        const passwordReset = await PasswordResetModel.findOne({ resetToken, expired: false });
        if (passwordReset) {
            const userId = passwordReset.user;
            await PasswordResetModel.findByIdAndUpdate(passwordReset._id, { expired: true });

            const hashedPassowrd = await bcrypt.hash(newPassword, cryptoSalt);
            await UserModel.findByIdAndUpdate(userId, { password: hashedPassowrd });

            res.status(200).json(generateResponseMessage(200, 'Your password has been reset.', null));

        } else {
            res.status(404).json(generateResponseMessage(404, 'This password reset rewuest does not exist or expired', null));
        }
    }
}

// TODO  : DEBUG IMAGE UPLOAD FOR NOT SAVING IF USER EXISTS

export default userCtrl;