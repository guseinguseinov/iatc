import mongoose from "mongoose";
// TODO: finsih this 
const CourseSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    certifacate: {
        type: Boolean,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    courseFeature: {
        starts: {
            type: Date,
            required: true,
        },

    }

});