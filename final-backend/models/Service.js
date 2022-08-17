import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
},{ timestamps:true });

const ServiceModel = mongoose.model('services', ServiceSchema);

export default ServiceModel;