import express from 'express';

import userUpload from '../middleware/upload.js';
import catchError from '../utils/catchError.js';
import userCtrl from '../controllers/user.controller.js';
import { authenticateUserToken } from '../middleware/auth.js';

const userRoute = express.Router();

const imageUpload = userUpload.single('profilePicture');

userRoute.post('/register', imageUpload, catchError(userCtrl.register));
userRoute.post('/login', catchError(userCtrl.login));
userRoute.get('/', catchError(userCtrl.getAllUsers));
userRoute.get('/:id', catchError(userCtrl.getUser));
userRoute.patch('/update/:id', authenticateUserToken, imageUpload, catchError(userCtrl.changeUserInfo));
userRoute.delete('/delete/:id', authenticateUserToken, catchError(userCtrl.deleteUser));
userRoute.post('/password/reset/', catchError(userCtrl.requestPasswordReset));
userRoute.patch('/password', catchError(userCtrl.resetPassword));

export default userRoute;  