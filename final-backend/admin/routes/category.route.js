import express from "express";
import categoryCtrl from "../controller/category.controller.js";
import { authenticateUserToken } from "../../middleware/auth.js";
import catchError from '../../utils/catchError.js';

const categoryRoute = express.Router();
categoryRoute.post('/create', authenticateUserToken, catchError(categoryCtrl.createCategory));
categoryRoute.get('/', catchError(categoryCtrl.getAllCategories));
categoryRoute.get('/:id', catchError(categoryCtrl.getSingleCategory));
categoryRoute.delete('/delete/:id', authenticateUserToken, catchError(categoryCtrl.deleteCategory));
categoryRoute.patch('/update/:id', authenticateUserToken, catchError(categoryCtrl.updateCategory));

export default categoryRoute;