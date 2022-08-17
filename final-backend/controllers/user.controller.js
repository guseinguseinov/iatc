import UserModel from "../models/User.js";
import generateResponseMessage from "../utils/resGenerate.js";

export const checkUserExists = async (req, res, next) => {
    const { email, phone } = req.body;

    if (email) {
        const user = await UserModel.findOne({ email, });
        if (user) {
            return res.status(400).json(generateResponseMessage(400, 'User email exists'));
        }
    }

    if (phone) {
        const user = await UserModel.findOne({ phone, });
        if (phone) {
            return res.status(400).json(generateResponseMessage(400, 'User phone exists'));
        }
    }
}

const userCtrl = {
    async getAllUsers() {

    },
    async register() {
        const { path } = req.file;
        const { firstName, lastName, phone, email, password, role } = req.body;

        const newUser = await UserModel({
            profilePicture: path,
            firstName,
            lastName,
            phone,
            email,
            password,
            role,
        });

        await newUser.save();

        res.status(201).json( generateResponseMessage(201, 'New User created', null) );
    },
    async login() {

    }
}

export default userCtrl;