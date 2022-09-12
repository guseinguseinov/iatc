import express from "express";
import { eventCommentCtrl } from "../controllers/comments.controller.js";
import eventCtrl from '../controllers/event.controller.js';
import { authenticateUserToken } from "../middleware/auth.js";
import catchError from '../utils/catchError.js';

const eventRoute = express.Router();

eventRoute.get('/', catchError(eventCtrl.getAllEvents));
eventRoute.get('/:id', catchError(eventCtrl.getSingleEvent));


eventRoute.post('/:id/comments', authenticateUserToken, catchError(eventCommentCtrl.addComment));
eventRoute.delete('/:id/comments/:commentId', authenticateUserToken, catchError(eventCommentCtrl.deleteComment));
eventRoute.patch('/:id/comments/:commentId', authenticateUserToken, catchError(eventCommentCtrl.editComment));

export default eventRoute;