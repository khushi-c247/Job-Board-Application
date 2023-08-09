import express, { Express } from 'express'
import userRouter from './src/Router/userRouter';
import adminRouter from './src/Router/adminRouter'
import mongoose from 'mongoose'
const app: Express = express();

//mongoDB connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/demo`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectDB();

//body parsing
app.use(express.json())
app.use(express.urlencoded())

//middleware functions
app.use('/admin', adminRouter)
app.use('/user', userRouter)

app.listen(3000, () => {
    console.log("server activated");
})

