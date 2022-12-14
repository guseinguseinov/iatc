import express from 'express';
import adminCtrl from '../controller/admin.controller.js';
import { authenticateAdminToken } from '../../middleware/auth.js';
import eventRoute from '../routes/event.route.js'

import catchError from '../../utils/catchError.js';
import NewsRoute from './news.route.js';
import sliderRoute from './sliderRoute.js';
import categoryRoute from './category.route.js';
import subscriberRoute from './subscriber.route.js';

const adminRoute = express.Router();

adminRoute.use('/events', eventRoute);
adminRoute.use('/news', NewsRoute);
adminRoute.use('/sliders', sliderRoute);
adminRoute.use('/categories',categoryRoute);
adminRoute.use('/subscribers',subscriberRoute)

adminRoute.post('/register', catchError(adminCtrl.register));
adminRoute.post('/login', catchError(adminCtrl.login));
adminRoute.patch('/update/:id', authenticateAdminToken, adminCtrl.changeAdminInfo);
adminRoute.delete('/delete/:id', authenticateAdminToken, catchError(adminCtrl.deleteAdmin));

export default adminRoute;