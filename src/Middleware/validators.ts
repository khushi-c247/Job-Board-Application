import {body, validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express';

// Validate the email and password
const validateMiddleware = [
    body('email').notEmpty(), body('password').notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const arrayOfErr = result.array();
        return res.status(400).json({ error: arrayOfErr[0]});
      }
      next();
    }
  ];

  export default validateMiddleware