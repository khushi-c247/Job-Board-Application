"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorLast = (err, req, res) => {
    console.log(err.status);
    // res.status(err.status);
    // res.send("Something went Wrong..");
};
exports.default = errorLast;
