"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validator = (req, res, next) => {
    // console.log("im inside validator");
    return (req, res, next) => {
        (0, express_validator_1.body)("email").notEmpty(), (0, express_validator_1.body)("password").notEmpty();
        next();
    };
};
exports.default = validator;
