"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./src/Router/userRouter"));
const adminRouter_1 = __importDefault(require("./src/Router/adminRouter"));
const commonRouter_1 = __importDefault(require("./src/Router/commonRouter"));
const env_1 = require("./src/config/env");
const db_1 = __importDefault(require("./src/config/db"));
const passport_1 = __importDefault(require("./src/config/passport"));
const errorHandler_1 = __importDefault(require("./src/Middleware/errorHandler"));
const errorLast_1 = __importDefault(require("./src/Middleware/errorLast"));
const app = (0, express_1.default)();
app.use(passport_1.default.initialize());
//mongoDB connection
(0, db_1.default)();
//body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
//middleware functions
app.use('/admin', adminRouter_1.default);
app.use('/user', userRouter_1.default);
app.use('/', commonRouter_1.default);
//view engine
// app.get ('/view' , (req:Request, res:Response) =>{
//   res.render('demo.pug')
// })
//Error Handlers
app.use(errorHandler_1.default);
app.use(errorLast_1.default);
app.listen(env_1.port, () => {
    console.log("server activated");
});
