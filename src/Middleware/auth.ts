import { Request, Response, NextFunction } from "express";
import { newUser } from "../interfaces/interfaces";


const authorization = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as newUser;
    if (user && role === user.role) {
      next();
    } else {
      res.status(403).json( { error : `you cannot access this page because you are ${role}` });
    }
  };
};
export default authorization;
