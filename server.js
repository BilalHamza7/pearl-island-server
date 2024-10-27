import express from 'express';
import mongoose from 'mongoose';
import adminRoute from './routes/adminRoute';
import featuredProdRoute from './routes/featuredProdRoute';
import inquiryRoute from './routes/inquiryRoute';
import requestRoute from './routes/requestRoute';
import productRoute from './routes/productRoute';
import session from 'express-session';
import dotenv from 'dotenv';

const app = express();
app.use(express.json()); // middleware to enable parsing request bodies
const port = process.env.PORT;
dotenv.config(); // reads .env file's variables and loads into process.env


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
