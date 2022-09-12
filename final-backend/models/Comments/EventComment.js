import mongoose from 'mongoose';

const EventCommentSchema = new mongoose.Schema({
    content: String,
    user: {
        type: "ObjectId",
        ref: "users",
        required: true
    },
    eventId: {
        type: "ObjectId",
        ref: "events",
        required: true
    }

}, {
    timestamps: true,
});

const EventCommentModel = mongoose.model('eventcomments', EventCommentSchema);

export default EventCommentModel;