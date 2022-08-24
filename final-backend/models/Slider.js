import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Slider title required']
    },
    description: {
        type: String,
        required: [true, 'Slider description required']
    },
    image: {
        type: String,
        required: [true, 'Slider image required']
    },
    url: {
        type: String,
        required: [true, 'Slider url required']
    }
}, { timestamps: true });

const SliderModel = mongoose.model('sliders', SliderSchema);

export default SliderModel;