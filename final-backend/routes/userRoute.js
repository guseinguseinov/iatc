import express from 'express';
import upload from '../middleware/upload.js';
import catchError from '../utils/catchError.js';
import userCtrl, { checkUser } from '../controllers/user.controller.js';

const userRoute = express.Router();

const imageUpload = upload.single('profilePicture');

// userRoute.get('/');
userRoute.post('/register', checkUser, imageUpload, catchError(userCtrl.register));
userRoute.post('/login', catchError(userCtrl.login));

export default userRoute;   