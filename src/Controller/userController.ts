import { Request, Response } from 'express'
import { getJobListings, createAplication ,getJobListingsId} from '../Services/jobApplicaionServices'
import createNewUser from '../Services/newUserService'

//Job Openinigs
const jobListing = async (req: Request, res: Response) => {
    const getjobListing: object = await getJobListings()
    return res.send(`Job Openings :${getjobListing}`)
}

//Job Application
const newApplication = async (req: Request, res: Response) => {  
    await createAplication(req.body)
    // console.log(req.body);
    
    return res.send("Application submited")
}

//New User 
const newUser = (req: Request, res: Response) => {
    createNewUser(req.body)
    return res.send("User Created!")
}
//find jobs By id
const findJob =  async (req: Request, res: Response) => {
    const getjobListingId = await getJobListingsId(req.params.id)
    return res.send(`Job Openings :${getjobListingId}`)
}
export { jobListing, newApplication, newUser ,findJob }