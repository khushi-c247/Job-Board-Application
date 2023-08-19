"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Error handeling 
const errorHandler = (err, req, res, next) => {
    console.log("Error Handler", err);
    next();
};
exports.default = errorHandler;
