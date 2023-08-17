import { Request, Response } from 'express'
import { addjobOpeninigs, updateJob, deleteJob, viewjobOpeninigs, filterdApplications, getApplicants, viewjobByIdOpeninigs }
    from '../Services/OpeningsServices'
//Send all the existig jobs 
const viewJobsController = async (req: Request, res: Response) => {
    const existingJobs = await viewjobOpeninigs()
    return res.status(200).send(existingJobs)
}
const viewJobsByIdController = async (req: Request, res: Response) => {
    const existingJobs = await viewjobByIdOpeninigs(req.params.id)
    return res.status(200).send(existingJobs)
}

//Add job Openings
const addJobsController = async (req: Request, res: Response) => {
    const saved = await addjobOpeninigs(req.body)
    console.log(req.body, saved);
    return res.status(200).send(`Job saved ${saved}`)
}

//Edit existing job details
const updateJobsController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const updated = await updateJob(req.body, id)
    return res.status(200).send(`Job updated ${updated}`)
}

//Delete jobs by ID  
const deleteJobsController = async (req: Request, res: Response) => {
    const id: string = req.params.id
    const deleted = await deleteJob(id)
    // return res.status(200).send(`Job deleted ${deleted}`)
}

//see all applicatints
const allApplicants = async (req: Request, res: Response) => {
    const applicants = await getApplicants()
    console.log(applicants);
    return res.send(`Job applicaints With Job details ${applicants}`)
}

//get filterd applications by Job id
const filterApplicants = async (req: Request, res: Response) => {
    const filterd = await filterdApplications(req.params.id)
    res.send(`Fillterd Applications ${filterd}`)
}

export { addJobsController, updateJobsController, deleteJobsController, viewJobsController, allApplicants, filterApplicants, viewJobsByIdController }