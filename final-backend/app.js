import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import sliderRoute from './routes/sliderRoute.js';
import userRoute from './routes/userRoute.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import notFound from './middleware/notFound.js';
config();

const mongodbUrl = process.env.NODE_ENV == 'development' ? process.env.MONGODB_URL_LOCAL : process.env.MONGODB_URL;
await mongoose.connect(mongodbUrl);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRoute);
app.use('/sliders', sliderRoute);
app.all('*', notFound);

app.use(errorMiddleware);

export default app;
