import { Request , Response, NextFunction } from "express";
import {newUser} from "../interfaces/interfaces"

interface demo {
_id : number;
name: string
email : string
password:string
experience :string,
discription :string,
graduationYear: string,
appliedTo : []
role : string
__v : number
}
const authorization = (role :string) => { 
    return (req :Request, res:Response, next:NextFunction)=>{
    const user= req.user;

    if(user && role === user.role)
    {        
        next();
    }
    else {
        res.sendStatus(403)
    }
}
}
export default authorization