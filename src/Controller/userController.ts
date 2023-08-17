import { Request, Response } from 'express'
import { getJobListings, createAplication ,getJobListingsId, } from '../Services/jobApplicaionServices'
import {createNewUser, getUser , login} from '../Services/newUserService'


//Job Openinigs
const jobListing = async (req: Request, res: Response) => {
    const getjobListing: object = await getJobListings()
    return res.send(`Job Openings :${getjobListing}`)
}

//Job Application
const newApplication = async (req: Request, res: Response) => {  
    await createAplication(req.body)
    return res.send("Application submited")
}
  
//New User 
const newUsercrete = async (req: Request, res: Response) => {
     await createNewUser(req.body)
    return res.send("User Created!")
}
//find jobs By id
const findJob =  async (req: Request, res: Response) => {
    const getjobListingId = await getJobListingsId(req.params.id)
    return res.send(`Job Openings :${getjobListingId}`)
}

//getUser
const getUserController =async (req:Request, res: Response ) => {
    const result = await getUser(req.body)
    res.send(result)
    
}

//loginUser
const loginController  =async (req:Request, res: Response) => {
  
    return await login(req, res) 
}
export { jobListing, newApplication, newUsercrete ,findJob , getUserController, loginController}