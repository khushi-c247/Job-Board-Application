import { Request, Response, NextFunction } from "express";
import { newUser } from "../interfaces/interfaces";


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
