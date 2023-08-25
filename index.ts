import express, { Express } from 'express'
import userRouter from './src/Router/userRouter';
import adminRouter from './src/Router/adminRouter'
import commonRouter from './src/Router/commonRouter'
import {port} from './src/config/env'
import dbConnection from './src/config/db'
import passport from './src/config/passport';
import errorHandler from "./src/Middleware/errorHandler"
import errorLast from './src/Middleware/errorLast'
const app: Express = express();
app.use (passport.initialize())

//mongoDB connection
dbConnection();

//body parsing
app.use(express.json());
app.use(express.urlencoded());

//middleware functions
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/',commonRouter)

//Error Handlers
app.use(errorHandler);
app.use(errorLast);

app.listen(port, () => {
    console.log("server activated");
})

