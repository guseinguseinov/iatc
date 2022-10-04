import express from "express";
import subscriberCtrl from "../controller/subscriber.controller.js";
import { authenticateUserToken } from "../../middleware/auth.js";
import catchError from '../../utils/catchError.js';

const subscriberRoute = express.Router();
subscriberRoute.post('/create', authenticateUserToken, catchError(subscriberCtrl.createSubscriber));
subscriberRoute.get('/', catchError(subscriberCtrl.getAllSubscribers));
subscriberRoute.get('/:id', catchError(subscriberCtrl.getSingleSubscriber));
subscriberRoute.delete('/delete/:id', authenticateUserToken, catchError(subscriberCtrl.deleteSubscriber));
subscriberRoute.patch('/update/:id', authenticateUserToken, catchError(subscriberCtrl.updateSubscriber));

export default subscriberRoute;