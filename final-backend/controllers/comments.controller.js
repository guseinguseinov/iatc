import EventCommentModel from "../models/Comments/EventComment.js";
import NewsCommentModel from "../models/Comments/NewsComment.js";
import EventModel from "../models/Event.js";
import NewsModel from "../models/News.js";
import generateResponseMessage from "../utils/resGenerate.js";


export const newsCommentCtrl = {
    async addComment(req, res) {
        const { userId } = req.query;
        const { id } = req.params;
        const { content } = req.body;
        if (!content || content.length == 0) return res.status(404).json(generateResponseMessage(404, "There is no content to update", null));

        const comment = NewsCommentModel({
            content,
            user: userId,
            newsId: id,
        });

        await comment.save();

        const news = await NewsModel.findById(id);
        news.comments.push(comment);

        await news.save();
        res.status(201).json(generateResponseMessage(201, 'Comment added', null));
    },
    async deleteComment(req, res) {
        const { id, commentId } = req.params;

        const news = await NewsModel.findByIdAndUpdate(id, {
            $pull: { comments: commentId }
        });

        if (!news) return res.status(404).json(generateResponseMessage(404, "News not found!", null));

        await NewsCommentModel.findByIdAndDelete(commentId);
        res.status(200).json(generateResponseMessage(200, 'comment deleted', null))
    },
    async editComment(req, res) {
        const { id, commentId } = req.params;
        const { content } = req.body;

        if (!content || content.length == 0) return res.status(404).json(generateResponseMessage(404, "There is no content to update", null));

        const comment = await NewsCommentModel.findByIdAndUpdate(commentId, req.body);

        if (!comment) return res.status(404).json(generateResponseMessage(404, "NO comment found!", null));

        res.status(200).json(generateResponseMessage(200, "Comment updated", null));
    }
}

export const eventCommentCtrl = {
    async addComment(req, res) {
        const { userId } = req.query;
        const { id } = req.params;
        const { content } = req.body;

        if (!content || content.length == 0) return res.status(404).json(generateResponseMessage(404, "There is no content to update", null));

        const comment = EventCommentModel({
            content,
            user: userId,
            eventId: id,
        });

        await comment.save();

        const event = await EventModel.findById(id);
        event.comments.push(comment);

        await event.save();
        res.status(201).json(generateResponseMessage(201, 'Comment added', null));
    },
    async deleteComment(req, res) {
        const { id, commentId } = req.params;

        const event = await EventModel.findByIdAndUpdate(id, {
            $pull: { comments: commentId }
        });

        if (!event) return res.status(404).json(generateResponseMessage(404, "News not found!", null));

        await EventCommentModel.findByIdAndDelete(commentId);
        res.status(200).json(generateResponseMessage(200, 'comment deleted', null))
    },
    async editComment(req, res) {
        const { id, commentId } = req.params;
        const { content } = req.body;

        if (!content || content.length == 0) return res.status(404).json(generateResponseMessage(404, "There is no content to update", null));

        const comment = await EventCommentModel.findByIdAndUpdate(commentId, req.body);

        if (!comment) return res.status(404).json(generateResponseMessage(404, "NO comment found!", null));

        res.status(200).json(generateResponseMessage(200, "Comment updated", null));
    }
}