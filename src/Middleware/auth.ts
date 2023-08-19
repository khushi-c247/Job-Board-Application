import { Request, Response, NextFunction } from "express";
import { newUser } from "../interfaces/interfaces";

// declare global {
//     namespace Express {
//         interface User extends newUser{
//             email?: string,
//             name : string
//         }
//     }
// }

const authorization = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as newUser;
    if (user && role === user.role) {
      next();
    } else {
      res.sendStatus(403);
    }
  };
};
export default authorization;
