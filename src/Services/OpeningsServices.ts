import job from '../Model/JobModel'
import { jobObj, newUser } from '../interfaces/interfaces'
import UserModel from '../Model/UserModel'


//View added jobs
const viewjobOpeninigs = async () => {
   const jobs = await job.find()
   return jobs;
}

//View jobs by id
const viewjobByIdOpeninigs = async (id: string) => {
   const getJobById = await job.findById(id)
   return getJobById;
}

// Add jobs to the DB 
const addjobOpeninigs = async (obj: jobObj) => {
   try {
      const created = await job.create({ title: obj.title, discription: obj.discription, requirements: obj.requirements, salary: obj.salary })
      return created
   } catch (error) {
      console.log("ERROR!!", error);
   }

}

//update jobs
const updateJob = async (obj: jobObj, id: string) => {
   try {
      const updated = await job.findByIdAndUpdate(id, { $set: { title: obj.title, salary: obj.salary, discription: obj.discription, requirements: obj.requirements } })
      return updated;
   } catch (error) {
      console.log(error);
   }
}

//delete jobs from DB
const deleteJob = async (id: string) => {
   try {
      const deleted = await job.findByIdAndDelete(id)
      return deleted;
   } catch (error) {
      console.log(error);

   }
}

//get Applicants
const getApplicants = async () => {
   const applicaints = await job.find();
   let allDetails: Object[] = [];
   let noApplicationDetails: Object[] = [];

   await Promise.all(applicaints.map(async (ids) => {
      if (ids.applicantsId.length >= 1) {
         let details = await Promise.all(ids.applicantsId.map(async (id) => {
            const applicaintDetail = await UserModel.findById(id);
            return applicaintDetail;
         }));

         allDetails = allDetails.concat(details);
      } else {
         noApplicationDetails.push({ 'no applications fors ': ids.title });
      }
   }));

   allDetails = allDetails.concat(noApplicationDetails);
   return allDetails;
}

//get fillterd applications by JobID
const filterdApplications = async (id: string) => {
   const filtred = await job.findById(id);
   const filterdUsers: Object[] = [];
   if (filtred && filtred.applicantsId) {
      await Promise.all(filtred.applicantsId.map(async ids => {
         const user = await UserModel.findById(ids);
         if (user) {
            filterdUsers.push(user);
         }
      }));
   }
   return filterdUsers;
}

export { addjobOpeninigs, updateJob, deleteJob, viewjobOpeninigs, getApplicants, filterdApplications, viewjobByIdOpeninigs }