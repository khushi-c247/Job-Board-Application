"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorLast = (req, res) => {
    res.status(500);
    res.send("Something went Wrong..");
};
exports.default = errorLast;
