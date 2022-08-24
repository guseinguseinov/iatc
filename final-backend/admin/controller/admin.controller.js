import { generateAccessToken } from "../../middleware/auth.js";
import AdminModel from "../../models/Admin.js";
import generateResponseMessage from "../../utils/resGenerate.js";

const adminCtrl = {
    async register(req, res) {
        const { email, password } = req.body;
        const newAdmin = await AdminModel(req.body);

        await newAdmin.save();
        const token = generateAccessToken({ id: newAdmin._id, role: newAdmin.role });
        res.cookie('accessToken', token, {
            maxAge: 60 * 60 * 12 * 1000,
            httpOnly: true,
        });

        res.status(201).json(generateResponseMessage(201, "New Admin created", token));
    },
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json(generateResponseMessage(400, 'Please provide email and password', null));
        }

        const admin = await AdminModel.findOne({ email }).select('+password');

        if (!admin) {
            return res.status(401).json(generateResponseMessage(401, 'Incorrect email or password', null));
        }

        const correct = await admin.correctPassword(password, admin.password);

        if (!correct) return res.status(401).json(generateResponseMessage(401, 'Incorrect email or password', null));

        const token = generateAccessToken({ id: admin._id, role: admin.role });

        res.cookie('accessToken', token, {
            maxAge: 60 * 60 * 12 * 1000,
            httpOnly: true,
        });

        res.status(200).json(generateResponseMessage(200, null, token));
    },
    async changeAdminInfo(req, res) {
        const { email } = req.body;

        if (email) {
            const admin = await AdminModel.findOne({ email });
            if (admin) return res.status(409).json(generateResponseMessage(409, 'Admin email already exists', null));
        }

        await AdminModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(generateResponseMessage(200, 'Admin info updated', null));
    },
    async deleteAdmin(req, res) {
        const admin = await AdminModel.findByIdAndDelete(req.params.id);

        if (!admin) return res.status(404).json(generateResponseMessage(404, 'Admin no longer exists', null));
        res.status(404).json(generateResponseMessage(404, 'Admin deleted successfully', null)); // when status code is 204 res message not displayed
    }
}

export default adminCtrl;