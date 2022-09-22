import fs from 'fs';

import NewsModel from "../../models/News.js";
import generateResponseMessage from "../../utils/resGenerate.js";


const NewsCtrl = {
    async addNews(req, res) {
        let path;
        if (req.file) {
            path = req.file.path;
        }
        let newsImage = 'http://localhost:8080/'+ path;
        const news = await NewsModel({
            ...req.body,
            newsImage: newsImage,
        });

        await news.save();

        res.status(201).json(generateResponseMessage(201, 'News added', news));
    },
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
    async updateNews(req, res) {
        const news = await NewsModel.findById(req.params.id);
        if (!news) return res.status(404).json(generateResponseMessage(404, 'No news found', null));

        if (req.file) {
            fs.unlinkSync(news.newsImage);
            await NewsModel.findByIdAndUpdate(req.params.id, {
                ...req.body,
                newsImage: req.file.path,
            });
        }

        await NewsModel.findByIdAndUpdate(req.params.id, {
            ...req.body,
        });

        res.status(200).json(generateResponseMessage(200, 'News content updated', null));
    },
    async deleteNews(req, res) {
        const news = await NewsModel.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json(generateResponseMessage(404, 'No news found', null));

        res.status(200).json(generateResponseMessage(200, 'News has been deleted successfully'));
    }
}

export default NewsCtrl;