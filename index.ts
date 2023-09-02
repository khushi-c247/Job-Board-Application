import express, { Express, Request, Response } from "express";
import { userRouter, adminRouter, commonRouter } from "./src/Router/index";
import { versions } from "./src/helper/constants";
import { port } from "./src/config/env";
import { dbConnection } from "./src/config/db";
import passport from "./src/config/passport";
import errorHandler from "./src/Middleware/errorHandler";
import errorLast from "./src/Middleware/errorLast";
const app: Express = express();
app.use(passport.initialize());

//mongoDB connection
dbConnection();

//body parsing
app.use(express.json());
app.use(express.urlencoded());

//middleware functions
app.use(`/${versions}/admin`, adminRouter);
app.use(`/${versions}/user`, userRouter);
app.use(`/${versions}`, commonRouter);

// view engine
// app.post ('/view' , (req:Request, res:Response) =>{
//     res.render('mail.pug')
//   })

app.use("*", (req: Request, res: Response) => {
  res.status(400).json({ message: " 404 URL not found :(" });
});

//Error Handlers
app.use(errorHandler);
app.use(errorLast);

app.listen(port, () => {
  console.log("server activated");
});

export default app;
