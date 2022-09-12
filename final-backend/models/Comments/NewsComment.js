import mongoose from 'mongoose';

const NewsCommentSchema = new mongoose.Schema({
    content: String,
    user: {
        type: "ObjectId",
        ref: "users",
        required: true
    },
    newsId: {
        type: "ObjectId",
        ref: "news",
        required: true
    }
}, {
    timestamps: true,
});

const NewsCommentModel = mongoose.model('newscomments', NewsCommentSchema);

export default NewsCommentModel;