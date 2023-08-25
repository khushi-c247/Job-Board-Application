import { NextFunction, Request, Response } from 'express'
import { addjobOpeninigs, updateJob, deleteJob, viewjobOpeninigs, getUser,filterdApplications, viewjobByIdOpeninigs }
    from '../Services/OpeningsServices'
//Send all the existig jobs 
const viewJobsController = async (req: Request, res: Response , next :NextFunction) => {
    try {
        const existingJobs = await viewjobOpeninigs(req.query)
        return res.status(200).json({'Jobs exist in DB' :existingJobs}) 
    } catch (error) {
        console.log(`error in admin Controler`);
        next(error)    
    }
}

//view by Id
const viewJobsByIdController = async (req: Request, res: Response, next :NextFunction) => {
    try {
        const existingJobs = await viewjobByIdOpeninigs(req.params.id)
        return res.status(200).json({'Job by Id' :existingJobs})  
    } catch (error) {
        console.log(`error in admin Controler`);
        next(error)    
    }
}

//Add job Openings
const addJobsController = async (req: Request, res: Response, next :NextFunction) => {
    try {
        const saved = await addjobOpeninigs(req.body)
        res.status(200).json({"Job deleted ":saved})

    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error)    
    }
}

//Edit existing job details
const updateJobsController = async (req: Request, res: Response, next :NextFunction) => {
    try {
        const id: string = req.params.id
        const updated = await updateJob(req.body, id)
         res.status(200).json({"Job updated" :updated})   
    } 
    catch (error) {
        console.log(`error in admin Controler`);
        next(error)    
    }
}

//Delete jobs by ID  
const deleteJobsController = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const id: string = req.params.id
        const deleted = await deleteJob(id)
        return res.status(200).json({"Job deleted ":deleted})
    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error)            
    }
}
//GetUser
const getUserController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await getUser(req.body);
      res.status(200).json({"User":result})
    } catch (error) {
      console.log("error in user controller");
      next(error);
    }
  };

//see all applicatints
// const allApplicants = async (req: Request, res: Response) => {
//     try {
//         // const applicants = await getApplicants()
//         console.log(applicants);
//         return res.send(`Job applicaints With Job details ${applicants}`)
//     }
//      catch (error) {
//         console.log(error);
//     }
// }

//get filterd applications by Job id
const filterApplicants = async (req: Request, res: Response) => {
    try {
        const filterd = await filterdApplications(req.params.id)
        res.status(200).json({"Filterd applications":filterd})
    } 
    catch (error) {
        console.log(error);
    }

}

export { addJobsController, updateJobsController, deleteJobsController, viewJobsController, getUserController,filterApplicants, viewJobsByIdController }