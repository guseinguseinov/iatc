import NewsModel from "../models/News.js";
import generateResponseMessage from "../utils/resGenerate.js";

const NewsCtrl = {
    async getNews(req, res) {
        const news = await NewsModel
            .find({})
            .populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
            .exec();

        if (!news) return res.status(404).json(generateResponseMessage(404, 'No news found', null));

        res.status(200).json(generateResponseMessage(200, null, news));
    },
    async getSingleNews(req, res) {
        const news = await NewsModel
            .findById(req.params.id)
            .populate({
                path: "comments",
                populate: {
                    path: "user"
                }
            })
            .exec();

        if (!news) return res.status(404).json(generateResponseMessage(404, 'No news found', null));
        res.status(200).json(generateResponseMessage(200, null, news));
    },
}

export default NewsCtrl;