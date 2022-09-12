import express from "express";
import eventCtrl from '../../admin/controller/event.controller.js';
import { authenticateAdminToken } from "../../middleware/auth.js";
import { eventUpload } from '../../middleware/upload.js';
import catchError from '../../utils/catchError.js';

const eventRoute = express.Router();

const imageUpload = eventUpload.single('eventImage');

eventRoute.post('/create', authenticateAdminToken, imageUpload, catchError(eventCtrl.createEvent));
eventRoute.get('/', catchError(eventCtrl.getAllEvents));
eventRoute.get('/:id', catchError(eventCtrl.getSingleEvent));
eventRoute.patch('/update/:id', authenticateAdminToken, imageUpload, catchError(eventCtrl.updateEvent));
eventRoute.delete('/delete/:id', authenticateAdminToken, catchError(eventCtrl.deleteEvent));

export default eventRoute;