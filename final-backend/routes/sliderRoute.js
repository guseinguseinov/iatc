import express from 'express';
import slidersCtrl from '../controllers/Sliders/slider.controller.js';
import { authenticateAdminToken } from '../middleware/auth.js';
import { sliderUpload } from '../middleware/upload.js';
import catchError from '../utils/catchError.js';

const sliderRoute = express.Router();

const imageUpload = sliderUpload.single('image');

sliderRoute.get('/', catchError(slidersCtrl.getAllSliders));
sliderRoute.get('/:id', catchError(slidersCtrl.getSingleSlider));
sliderRoute.post('/create', authenticateAdminToken, imageUpload, catchError(slidersCtrl.createSlider));
sliderRoute.patch('/update/:id', authenticateAdminToken, imageUpload, catchError(slidersCtrl.updateSlider));
sliderRoute.delete('/delete/:id', authenticateAdminToken, catchError(slidersCtrl.deleteSlider));

export default sliderRoute;