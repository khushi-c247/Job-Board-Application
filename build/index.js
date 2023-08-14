"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./src/Router/userRouter"));
const adminRouter_1 = __importDefault(require("./src/Router/adminRouter"));
const env_1 = require("./src/config/env");
const db_1 = __importDefault(require("./src/config/db"));
const app = (0, express_1.default)();
//mongoDB connection
(0, db_1.default)();
//body parsing
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
//middleware functions
app.use('/admin', adminRouter_1.default);
app.use('/user', userRouter_1.default);
app.listen(env_1.port, () => {
    console.log("server activated");
});
