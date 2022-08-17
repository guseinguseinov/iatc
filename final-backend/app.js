import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

import sliderRoute from './routes/sliderRoute.js';
import userRoute from './routes/userRoute.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import notFound from './middleware/notFound.js';
config();

const app = express();
const mongodbUrl = process.env.MONGODB_URL;
await mongoose.connect(mongodbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/users', userRoute);
app.use('/sliders', sliderRoute);
app.all('*', notFound);

app.use(errorMiddleware);

export default app;
