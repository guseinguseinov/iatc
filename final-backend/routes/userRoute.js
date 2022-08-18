import express from 'express';
import checkUser from '../middleware/userChecker.js';

import upload from '../middleware/upload.js';
import catchError from '../utils/catchError.js';
import userCtrl from '../controllers/user.controller.js';
import { authenticateUserToken } from '../middleware/auth.js';

const userRoute = express.Router();

const imageUpload = upload.single('profilePicture');

userRoute.post('/register', checkUser, imageUpload, catchError(userCtrl.register));
userRoute.post('/login', catchError(userCtrl.login));
userRoute.get('/', catchError(userCtrl.getAllUsers));
userRoute.get('/:id', catchError(userCtrl.getUser));
userRoute.patch('/update/:id', authenticateUserToken, catchError(userCtrl.changeUserInfo));


export default userRoute;  