"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && role === user.role) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
};
exports.default = authorization;
