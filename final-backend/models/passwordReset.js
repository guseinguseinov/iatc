import mongoose from "mongoose";

const PasswordResetSchema = new mongoose.Schema({
    user: {
        type: "ObjectId",
        ref: "users",
    },
    resetToken: String,
    expired: {
        type: Boolean,
        default: () => false,
    },
}, {
    timestamps: true,
});

const PasswordResetModel = mongoose.model(
    'passwordresets',
    PasswordResetSchema
);

export default PasswordResetModel;