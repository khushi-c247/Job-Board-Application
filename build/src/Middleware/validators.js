"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = exports.validateForggot = void 0;
const express_validator_1 = require("express-validator");
// Validate the email and password
const validateMiddleware = [
    (0, express_validator_1.body)('email').notEmpty().isEmail(), (0, express_validator_1.body)('password').notEmpty().isStrongPassword(),
    (req, res, next) => {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            const arrayOfErr = result.array();
            return res.status(400).json({ error: { path: arrayOfErr[0].path, message: arrayOfErr[0].msg } });
        }
        next();
    }
];
exports.validateMiddleware = validateMiddleware;
const validateForggot = [
    (0, express_validator_1.body)('email').notEmpty(),
    (req, res, next) => {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            const arrayOfErr = result.array();
            console.log(arrayOfErr, result);
            return res.status(400).json({ error: { path: arrayOfErr[0].path, message: arrayOfErr[0].msg } });
        }
        next();
    }
];
exports.validateForggot = validateForggot;
