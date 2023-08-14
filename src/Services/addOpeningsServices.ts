import jobModel from '../Model/Job-listing'
import {jobObj} from '../interfaces/reqRes'

// add jobs 
const addjobOpeninigs =  async(obj : jobObj)=>{
    const created  = await jobModel.create({type : obj.type , salary : obj.salary})
    return created;
 }

//update jobs
 const updateJob =  async(obj : jobObj , id: string)=>{
 const updated  = await jobModel.findByIdAndUpdate(id, {$set :{type :obj.type , salary: obj.salary}})
 return updated;
 }

//delete jobs
 const deleteJob =  async (id: string) =>{
 const deleted = await jobModel.findByIdAndDelete(id)
    return deleted;
 }

 export  {addjobOpeninigs , updateJob, deleteJob}