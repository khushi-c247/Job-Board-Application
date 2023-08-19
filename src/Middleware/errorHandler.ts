import {Request,Response,NextFunction } from "express";

//Error handeling 
const errorHandler = (err: Error,req: Request, res: Response, next: NextFunction)=>{
    console.log("Error Handler",err);
    next();
}
export default errorHandler