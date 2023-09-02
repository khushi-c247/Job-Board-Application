"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Error handeling 
const errorHandler = (error, req, res, next) => {
    console.log("Error Handler", error.status);
    // next();
    res.status(error.status).json({ message: error.message });
};
exports.default = errorHandler;
