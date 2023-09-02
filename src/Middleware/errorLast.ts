import { Request, Response,  } from "express";
const errorLast = (err:any ,req: Request, res: Response) => {
console.log(err.status);

  // res.status(err.status);
  // res.send("Something went Wrong..");
};
export default errorLast;
