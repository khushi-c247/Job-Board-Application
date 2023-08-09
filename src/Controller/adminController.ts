import {Request, Response} from  'express'
import {addjobOpeninigs, updateJob, deleteJob} from '../Services/addOpeningsServices'


const addJobsController = (req:Request , res:Response) =>{
    const saved =  addjobOpeninigs(req.body)
    return res.send (`Job saved`)
}


const updateJobsController = (req:Request , res:Response )=>{
    const id = req.params.id
    const updated = updateJob(req.body , id )
    return res.send (`Job updated`)
}


const deleteJobsController  = (req:Request , res:Response )=>{
    const id = req.params.id
    const deleted = deleteJob(id)
    return res.send (`Job updated`)
}

export {addJobsController ,updateJobsController , deleteJobsController }