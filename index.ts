import express, { Express } from 'express'
import userRouter from './src/Router/userRouter';
import adminRouter from './src/Router/adminRouter'
import {port} from './src/config/env'
import dbConnection from './src/config/db'
const app: Express = express();

//mongoDB connection
dbConnection()

//body parsing
app.use(express.json())
app.use(express.urlencoded())

//middleware functions
app.use('/admin', adminRouter)
app.use('/user', userRouter)

app.listen(port, () => {
    console.log("server activated");
})

