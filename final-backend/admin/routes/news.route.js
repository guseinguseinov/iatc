import express from 'express';
import { authenticateAdminToken } from '../../middleware/auth.js';
import { newsUpload } from '../../middleware/upload.js';
import catchError from '../../utils/catchError.js';
import NewsCtrl from '../controller/news.controller.js';

const NewsRoute = express.Router();

NewsRoute.post('/add', authenticateAdminToken, newsUpload.single('newsImage'), catchError(NewsCtrl.addNews));
NewsRoute.get('/all', catchError(NewsCtrl.getNews));
NewsRoute.get('/:id', catchError(NewsCtrl.getSingleNews));
NewsRoute.patch('/:id', authenticateAdminToken, newsUpload.single('newsImage'), catchError(NewsCtrl.updateNews));
NewsRoute.delete('/:id', authenticateAdminToken, catchError(NewsCtrl.deleteNews));

export default NewsRoute;