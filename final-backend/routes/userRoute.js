import express from 'express';
import upload from '../middleware/upload.js';
import catchError from '../utils/catchError.js';
import userCtrl, { checkUserExists } from '../controllers/user.controller.js';

const userRoute = express.Router();

const imageUpload = upload.single('profilePicture');

// userRoute.get('/');
userRoute.post('/register', checkUserExists ,imageUpload, catchError(userCtrl.register));
userRoute.post('/login', )

export default userRoute;