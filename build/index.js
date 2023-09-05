"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./src/Router/index");
const constants_1 = require("./src/helper/constants");
const env_1 = require("./src/config/env");
const db_1 = require("./src/config/db");
const loginPassport_1 = __importDefault(require("./src/config/loginPassport"));
const errorHandler_1 = __importDefault(require("./src/Middleware/errorHandler"));
const app = (0, express_1.default)();
app.use(loginPassport_1.default.initialize());
//mongoDB connection
(0, db_1.dbConnection)();
//body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
//middleware functions
app.use(`/${constants_1.versions}/admin`, index_1.adminRouter);
app.use(`/${constants_1.versions}/user`, index_1.userRouter);
app.use(`/${constants_1.versions}`, index_1.commonRouter);
// view engine
// app.post ('/view' , (req:Request, res:Response) =>{
//     res.render('mail.pug')
//   })
app.use("*", (req, res) => {
    res.status(400).json({ message: " 404 URL not found :(" });
});
//Error Handlers
app.use(errorHandler_1.default);
app.listen(env_1.port, () => {
    console.log("server activated");
});
exports.default = app;
