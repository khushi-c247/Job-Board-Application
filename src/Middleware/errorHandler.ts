import {Request,Response,NextFunction } from "express";

//Error handeling 
const errorHandler = (error :any ,req: Request, res: Response, next: NextFunction)=>{
    console.log("Error Handler",error.status);
    // next();
    res.status(error.status).json({ message : error.message})
}
export default errorHandler