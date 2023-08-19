import { Request, Response,  } from "express";
const errorLast = (req: Request, res: Response) => {
  res.status(500);
  res.send("Something went Wrong..");
};
export default errorLast;
