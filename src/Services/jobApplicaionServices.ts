import applicationModel from '../Model/AppliModel'
import jobsListing from '../Model/Job-listing'
import {appliObj} from  '../interfaces/reqRes'

//create job application
  const createAplication =   async (obj : appliObj)=>{
   await applicationModel.create({name : obj.name , email : obj.email})
  }

// get existing job openings from DB
  const getJobListings = async () =>{
   const result = await jobsListing.find()
   return result; 
  }
  
// Create a new User to DataBase
 export  {createAplication, getJobListings} 