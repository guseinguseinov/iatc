import { generateAccessToken } from "../middleware/auth.js";
import UserModel from "../models/User.js";
import generateResponseMessage from "../utils/resGenerate.js";

export const checkUser = async (req, res, next) => {
    const { email, phone } = req.body;
    
    console.log(req.body);
    console.log(email, phone);
    if (email) {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json( generateResponseMessage(400, 'User email exists', null) );
        }
    }

    if (phone) {
        const user = await UserModel.findOne({ phone });
        if (user) {
            return res.status(400).json(generateResponseMessage(400, 'User phone exists', null));
        }
    }
    next();
}

// TODO 3 : DEBUG THIS

const userCtrl = {
    async register(req, res) {
        const { path } = req.file;
        const { password, ...restData } = req.body;

        const newUser = await UserModel({
            profilePicture: path,
            ...req.body,
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

        const correct = await user.correctPassword(password, user.password);

        if (!user || !correct) {
            return res.status(401).json(generateResponseMessage(401, 'Incorrect email or password', null));
        }

        const token = generateAccessToken({ id: user._id });
        res.status(200).json(generateResponseMessage(200, null, token));
    }
}

// TODO 1 : finish change user data
// TODO 2 : finish delete user data


export default userCtrl;