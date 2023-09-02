import { NextFunction, Request, Response } from "express";
import {
  getJobListings,
  createAplication,
  getJobListingsId, sorting ,myJobs, serchService
} from "../Services/jobApplicaionServices";
import {newUser,reqUser} from '../interfaces/interfaces'
import { createNewUser,  login, updateUser , deleteUser} from "../Services/newUserService";

// import {
//   getJobListings,createAplication , getJobListingsId, sorting ,myJobs, serchService , createNewUser,  login, updateUser , deleteUser
// } from '../Services/index'
//Job Openinigs
const jobListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getjobListing = await getJobListings();
    res.status(200).json({"Active job listings:":getjobListing})
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
    let user : reqUser = req.user!
    await createAplication(user! ,req.body);
    // res.status(200).json({message : "Your application has been submitted!"})
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
    res.status(200).json({"User created:":user})
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

//Find jobs By id : REMOVE
const findJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getjobListingId = await getJobListingsId(req.params.id);
    res.status(200).json({"Job listnings:":getjobListingId})
  } catch (error) {
    console.log("error in user controller");
    next(error);
  }
};

//Sorting
const sortController = async (req :Request, res:Response, next:NextFunction)=>{
  try {
    const sorted = await sorting(req.body , req.query);
    res.status(200).json({"sorted data:":sorted})
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

//
const GetmyJobs =async (req:Request, res :Response, next:NextFunction) => {
  try {
    let user : reqUser = req.user!
    const myJob = await myJobs(user,req.query)
    res.status(200).json({"You have applied to these following jobs:":myJob})
  } catch (error) {
    console.log("error in GetMy jobs controller");
    next();
    
  }
}
//Serching Jobs through "title", "discription", "requirements"
const JobserchController = async (req:Request, res :Response, next:NextFunction) => {
  try {
      const search = await serchService(req.body)
      res.status(200).json({"serched data:":search})
      
  } catch (error) {
    console.log(error,"error in serchController");
    next(error);    
  }
}

const updateUserController = async (req: Request, res: Response,  next: NextFunction) => {
try {
  let user : reqUser = req.user!
   await updateUser(user, req.body)
  // return updatedUser
    res.status(200).json({message:" Your details has been changed successfully! "})
  
} catch (error) {
  console.log("error in user controller");
  next(error);
}}

const deleteUserController =async (req: Request, res: Response,  next: NextFunction) => {
 try {
  let user : reqUser = req.user!
    await deleteUser( user)
    res.status(200).json({message:" Your account has been deleted! :("})
 } catch (error) {
  console.log(" in user controller delete user");
  
  next(error)
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
  JobserchController,
  updateUserController,
  deleteUserController
};
