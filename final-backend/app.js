import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import sliderRoute from './routes/sliderRoute.js';
import userRoute from './routes/userRoute.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import notFound from './middleware/notFound.js';
import adminRoute from './admin/routes/admin.route.js';
config();

const mongodbUrl = process.env.NODE_ENV == 'development' ? process.env.MONGODB_URL_LOCAL : process.env.MONGODB_URL;
await mongoose.connect(mongodbUrl);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
}));
app.use(cookieParser());


app.use('/users', userRoute);
app.use('/admin', adminRoute);
app.all('*', notFound);

app.use(errorMiddleware);

export default app;
