import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import adminRoute from './routes/adminRoute.js';
import featuredProdRoute from './routes/featuredProdRoute.js';
import inquiryRoute from './routes/inquiryRoute.js';
import requestRoute from './routes/requestRoute.js';
import productRoute from './routes/productRoute.js';

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

const app = express(); // initializing express app

app.use(express.json({ limit: '10mb' })); // to allow larger document size
app.use(cors(corsOptions)); // middleware to allow requests from origin
app.use(cookieParser());
dotenv.config(); // reads .env file's variables and loads into process.env

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
}).then(() => console.log('Connected To Pear Island')).catch((err) => console.log("Error Connecting To Pear Island: ", err));

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGODB_URL, // MongoDB connection string
    collectionName: 'sessions',
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, // will not create a session if no objects is set in the session 
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60, // 24 hours expiration for cookie
        httpOnly: true,
        secure: false, // should be true to use in https connection false because localhost is not https
        sameSite: 'none', // for different ports of frontend and backend
    }
}));

app.get('/admin/checkSession', (req, res) => {
    if (!req.session || !req.session.adminId) {
      return res.json({ authenticated: false });
    }

    console.log(req.sessionID);
  
    // Session exists and is valid, check the session in MongoStore
    sessionStore.get(req.sessionID, (err, session) => {
      if (err) {
        console.error('Error retrieving session from store:', err);
        return res.status(500).json({ authenticated: false, session: 'not created' });
      }
  
      if (!session || !session.adminId) {
        return res.json({ authenticated: false, session: 'not available' });
      }
  
      // Session exists and is valid
      return res.json({ authenticated: true, adminId: session.adminId });
    });
  });

app.use('/admin', adminRoute);
app.use('/featuredProd', featuredProdRoute);
app.use('/inquiry', inquiryRoute);
app.use('/request', requestRoute);
app.use('/product', productRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

