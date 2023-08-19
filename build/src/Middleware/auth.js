"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// declare global {
//     namespace Express {
//         interface User extends newUser{
//             email?: string,
//             name : string
//         }
//     }
// }
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
