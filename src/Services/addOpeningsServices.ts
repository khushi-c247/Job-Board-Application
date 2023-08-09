import jobModel from '../Model/Job-listing'
    interface reqObj  {
        type : string,
        salary : number
    }

// add jobs 
const addjobOpeninigs =  async(obj : reqObj)=>{
    const created  = await jobModel.create({type : obj.type , salary : obj.salary})
    return created;
 }

//update jobs
 const updateJob =  async(obj : reqObj , id: string)=>{
 const updated  = await jobModel.findByIdAndUpdate(id, {$set :{type :obj.type , salary: obj.salary}})
    // add object to res.send
    return updated;
 }

//delete jobs
 const deleteJob =  async (id: string) =>{
 const deleted = await jobModel.findByIdAndDelete(id)
    return deleted;
 }

 export  {addjobOpeninigs , updateJob, deleteJob}