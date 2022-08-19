import fs from 'fs';

import { generateAccessToken } from "../middleware/auth.js";
import UserModel from "../models/User.js";
import generateResponseMessage from "../utils/resGenerate.js";

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
        const user = await UserModel.findById(req.params.id);
        fs.unlinkSync(user.profilePicture);

    }
}

// TODO 1 : finish change user data
// TODO 2 : finish delete user data
// TODO 3 : FINISH AUTH WITH COOKIE
// TODO 4 : DEBUG IMAGE UPLOAD FOR NOT SAVING IF USER EXISTS

export default userCtrl;