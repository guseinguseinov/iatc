import express from "express";
import eventCtrl from '../../admin/controller/event.controller.js';
import { eventUpload } from '../../middleware/upload.js';
import catchError from '../../utils/catchError.js';

const eventRoute = express.Router();

const imageUpload = eventUpload.single('eventImage');

eventRoute.post('/create',imageUpload,catchError( eventCtrl.createEvent));
eventRoute.get('/',catchError(eventCtrl.getAllEvents));
eventRoute.get('/:id',catchError(eventCtrl.getSingleEvent));
eventRoute.patch('/update/:id',imageUpload,catchError(eventCtrl.updateEvent));
eventRoute.delete('/delete/:id',catchError(eventCtrl.deleteEvent));

export default eventRoute;