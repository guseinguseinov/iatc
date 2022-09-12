import express from 'express';
import catchError from '../utils/catchError.js';
import NewsCtrl from '../controllers/news.controller.js';
import { authenticateUserToken } from '../middleware/auth.js';
import { newsCommentCtrl } from '../controllers/comments.controller.js';

const NewsRoute = express.Router();

NewsRoute.get('/', catchError(NewsCtrl.getNews));
NewsRoute.get('/:id', catchError(NewsCtrl.getSingleNews));

NewsRoute.post('/:id/comments', authenticateUserToken, catchError(newsCommentCtrl.addComment));
NewsRoute.delete('/:id/comments/:commentId', authenticateUserToken, catchError(newsCommentCtrl.deleteComment));
NewsRoute.patch('/:id/comments/:commentId', authenticateUserToken, catchError(newsCommentCtrl.editComment));

export default NewsRoute;