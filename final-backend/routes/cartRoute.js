import express from 'express';
import CartCtrl from '../controllers/cart.contreller.js';
import { authenticateUserToken } from '../middleware/auth.js';
import catchError from '../utils/catchError.js';

const cartRoute = express.Router();

cartRoute.post('/add', authenticateUserToken, catchError(CartCtrl.addToCart));
cartRoute.delete('/remove', authenticateUserToken, catchError(CartCtrl.removeFromCart));

export default cartRoute;