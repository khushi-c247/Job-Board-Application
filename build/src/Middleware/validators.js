"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
// Validate the email and password
const validateMiddleware = [
    (0, express_validator_1.body)('email').notEmpty(), (0, express_validator_1.body)('password').notEmpty(),
    (req, res, next) => {
        const result = (0, express_validator_1.validationResult)(req);
        if (!result.isEmpty()) {
            const arrayOfErr = result.array();
            return res.status(400).json({ error: arrayOfErr[0] });
        }
        next();
    }
];
exports.default = validateMiddleware;
