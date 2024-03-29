import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

mongoose.connect(process.env.MONGODB).then(() => {
    console.log("Connected to MongoDB!");
    }).catch((err) => {
        console.log(err)
    });

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

//to send json in request/response
app.use(express.json());

//routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

//middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success: false, 
        statusCode,
        message,
    });
});