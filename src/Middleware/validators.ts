import {body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express';

// Validate the email and password
const validateMiddleware = [
    body('email').notEmpty().isEmail(), body('password').notEmpty().isStrongPassword(),
    (req: Request, res: Response, next: NextFunction) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const arrayOfErr :any= result.array();
        return res.status(400).json({error :{ path : arrayOfErr[0].path, message : arrayOfErr[0].msg}});
      }
      next();
    }
  ];


  const validateForggot = [
    body('email').notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
      const result  = validationResult(req);

      
      if (!result.isEmpty()) {
        const arrayOfErr : any  = result.array();
        console.log(arrayOfErr, result);
        return res.status(400).json({error :{ path : arrayOfErr[0].path, message : arrayOfErr[0].msg}});
      }

      next();
    }
  ];

  export {validateForggot ,validateMiddleware}