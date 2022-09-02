import express from 'express';
import adminCtrl from '../controller/admin.controller.js';
import { authenticateAdminToken } from '../../middleware/auth.js';
import eventRoute from '../routes/event.route.js'

import catchError from '../../utils/catchError.js';


const adminRoute = express.Router();

adminRoute.use('/events', eventRoute);

adminRoute.post('/register', catchError(adminCtrl.register));
adminRoute.post('/login', catchError(adminCtrl.login));
adminRoute.patch('/update/:id', authenticateAdminToken, adminCtrl.changeAdminInfo);
adminRoute.delete('/delete/:id', catchError(adminCtrl.deleteAdmin));

export default adminRoute;