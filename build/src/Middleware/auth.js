"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorization = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (user && role === user.role) {
            next();
        }
        else {
            res.status(403).json({ error: `you cannot access this page because you are ${role}` });
        }
    };
};
exports.default = authorization;
