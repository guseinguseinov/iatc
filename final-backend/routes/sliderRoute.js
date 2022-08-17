import express from 'express';
import slidersCtrl from '../controllers/Sliders/slider.controller.js';
// import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import catchError from '../utils/catchError.js';

const sliderRoute = express.Router();

const imageUpload = upload.single('image');

sliderRoute.get('/', catchError( slidersCtrl.getAllSliders ));
sliderRoute.get('/:id', catchError( slidersCtrl.getSingleSlider ));
sliderRoute.post('/create', imageUpload, catchError( slidersCtrl.createSlider ));
sliderRoute.patch('/update/:id', imageUpload, catchError( slidersCtrl.updateSlider ));
sliderRoute.delete('/delete/:id', catchError( slidersCtrl.deleteSlider ));

export default sliderRoute;