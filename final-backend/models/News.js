import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title required'],
    },
    description: String,
    newsImage: String,
    url: String,
}, {
    timestamps: true,
});

const NewsModel = mongoose.model('news', NewsSchema);

export default NewsModel;