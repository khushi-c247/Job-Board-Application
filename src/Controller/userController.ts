import {Request, Response} from  'express'
import  createAplication from '../Services/jobApplicaionServices'

// //Job Openinigs
// const userController = (req:Request , res:Response) =>{
//     // const mangeOpenings  = managementOpeninigs();
//     const devOpeninigs = developerOpeninigs()
//     return res.send(`Mangement Openings :${mangeOpenings} Developer Openings :${devOpeninigs}`) 
// }

//Job Application
const newApplication = (req:Request , res:Response) =>{
     createAplication(req.body)   
    return res.send ("Application submited")
}

export default newApplication