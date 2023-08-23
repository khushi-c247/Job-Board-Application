import { NextFunction, Request, Response } from "express";
import {
  getJobListings,
  createAplication,
  getJobListingsId, sorting ,myJobs, serchService
} from "../Services/jobApplicaionServices";
import { createNewUser,  login } from "../Services/newUserService";

//Job Openinigs
const jobListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getjobListing = await getJobListings();
    return res.send(`Job Openings :${getjobListing}`);
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

//Job Application
const newApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createAplication(req.body);
    return res.send("Application submited");
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

//New User
const newUsercrete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createNewUser(req.body);

    return res.send(`User Created! ${user}`);
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

//Find jobs By id
const findJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getjobListingId = await getJobListingsId(req.params.id);
    return res.send(`Job Openings :${getjobListingId}`);
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

//Sorting
const sortController = async (req :Request, res:Response, next:NextFunction)=>{
  try {
    const sorted = await sorting(req.body);
    res.send(sorted)
  } catch (error) {
    console.log("error in user controller");
    next(error)    
  }   
}

//LoginUser
const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return await login(req, res);
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

const GetmyJobs =async (req:Request, res :Response, next:NextFunction) => {
  try {
    const myJob = await myJobs(req.body)
    res.send(myJob)
  } catch (error) {
    console.log("error in GetMy jobs controller");
    next();
    
  }
}

const serchController = async (req:Request, res :Response, next:NextFunction) => {
  try {
      const search = await serchService(req.body)
      res.send (search)
      
  } catch (error) {
    console.log(error,"error in serchController");
    next();    
  }
}

export {
  jobListing,
  newApplication,
  newUsercrete,
  findJob,
  loginController,
  sortController,
  GetmyJobs,
  serchController
};
