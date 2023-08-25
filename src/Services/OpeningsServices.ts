import Job from '../Model/JobModel'
import { jobObj, newUser, Loginbody} from '../interfaces/interfaces'
import User from '../Model/UserModel'
import {ParsedQs} from 'qs'


//View added jobs
const viewjobOpeninigs = async (obj: ParsedQs) => {
   try {
      const options :object = {
         page: obj.page,
         limit: obj.limit
     };
      const result = Job.aggregate([
         {
            $project : {
            _id : 0,
            title: 1,
            discription :1,
            requirements :1,
            salary :1
         }}
      ])
       const response =await Job.aggregatePaginate(result ,options)
      return response
      
   } catch (error) {
   console.log(`Error in Opening Services ${error}`);
   }
}

//View jobs by id
const viewjobByIdOpeninigs = async (id: string) => {
   try {
      const getJobById = await Job.findById(id)
      return getJobById;
   } catch (error) {
      console.log(`Error in Opening Services ${error}`);
   }
}

// Add jobs to the DB 
const addjobOpeninigs = async (obj: jobObj) => {
   try {
      const created = await Job.create(obj)
      return created
   } catch (error) {
      console.log(`Error in Opening Services ${error}`);
   }
}

//update jobs
const updateJob = async (obj: jobObj, id: string) => {
   try {
      const updated = await Job.findByIdAndUpdate(id, { $set: { title: obj.title, salary: obj.salary, discription: obj.discription, requirements: obj.requirements } })
      return updated;
   } catch (error) {
      console.log(error);
   }
}

//delete jobs from DB
const  deleteJob = async (id: string) => {
   try {
      const deleted = await Job.findByIdAndDelete(id)
      return deleted;
   } catch (error) {
      console.log(error);

   }
}

//get Applicants
// const getApplicants = async () => {
// try {
//    const applicaints = await Job.find();
//    let allDetails: Object[] = [];
//    let noApplicationDetails: Object[] = [];

//    await Promise.all(applicaints.map(async (ids) => {
//       if (ids.applicantsId.length >= 1) {
//          let details = await Promise.all(ids.applicantsId.map(async (id) => {
//             const applicaintDetail = await User.findById(id);
//             return applicaintDetail;
//          }));

//          allDetails = allDetails.concat(details);
//       } else {
//          noApplicationDetails.push({ 'no applications fors ': ids.title });
//       }
//    }));

//    allDetails = allDetails.concat(noApplicationDetails);
//    return allDetails;
// } 
// catch (error) {
//    console.log(error);
// }}

//get fillterd applications by JobID
const filterdApplications = async (id: string) => {
   try {
      const filtred = await Job.findById(id);
      const filterdUsers :object[]= [];
      if (filtred && filtred.applicantsId) {
         await Promise.all(filtred.applicantsId.map(async ids => {
            const user = await User.findById(ids);
            if (user) {
               filterdUsers.push(user);
            }
         }));
      }
      return filterdUsers;
   } catch (error) {
      console.log(error);
      
   }                                                                  

}
//User get
const getUser = async (obj: Loginbody): Promise<newUser | null> => {
   const getUser: newUser | null = await User.findOne({ email: obj.email })
   return getUser;
}



export { addjobOpeninigs, updateJob, deleteJob, viewjobOpeninigs,getUser, filterdApplications, viewjobByIdOpeninigs }