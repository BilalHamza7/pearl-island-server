import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRoute from './routes/adminRoute.js';
import featuredProdRoute from './routes/featuredProdRoute.js';
import inquiryRoute from './routes/inquiryRoute.js';
import requestRoute from './routes/requestRoute.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:3000',
}


const app = express(); // initializing express app
app.use(express.json({ limit: '10mb' })); // to allow larger document size
app.use(cors(corsOptions)); // middleware to allow requests from origin
app.use(express.json()); // middleware to enable parsing request bodies
app.use(cookieParser());
dotenv.config(); // reads .env file's variables and loads into process.env
const port = process.env.PORT;

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
}).then(() => console.log('Connected To Pear Island')).catch((err) => console.log("Error Connecting To Pear Island: ", err));

app.use('/admin', adminRoute);
app.use('/featuredProd', featuredProdRoute);
app.use('/inquiry', inquiryRoute);
app.use('/request', requestRoute);
app.use('/product', productRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

