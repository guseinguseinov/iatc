import UserModel from "../models/User.js";
import generateResponseMessage from "../utils/resGenerate.js";

const checkUser = async (req, res, next) => {
    const { email, phone } = req.body;

    console.log(req.body);
    if (email) {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json(generateResponseMessage(400, 'User email exists', null));
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

export default checkUser;