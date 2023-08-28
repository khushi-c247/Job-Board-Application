import Job from "../Model/JobModel";
import { jobObj, newUser, Loginbody, search ,orInterface } from "../interfaces/interfaces";
import User from "../Model/UserModel";
import mongoose from "mongoose";
import { ParsedQs } from "qs";

//View added jobs
const viewjobOpeninigs = async (obj: ParsedQs) => {
  try {
    const options: object = {
      page: obj.page,
      limit: obj.limit,
    };
    const result = Job.aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          discription: 1,
          requirements: 1,
          salary: 1,
        },
      },
    ]);
    const response = await Job.aggregatePaginate(result, options);
    return response;
  } catch (error) {
    console.log(`Error in Opening Services ${error}`);
  }
};

//View jobs by id
const viewjobByIdOpeninigs = async (id: string) => {
  try {
    const getJobById = await Job.findById(id);
    return getJobById;
  } catch (error) {
    console.log(`Error in Opening Services ${error}`);
  }
};

// Add jobs to the DB
const addjobOpeninigs = async (obj: jobObj) => {
  try {
    const created = await Job.create(obj);
    return created;
  } catch (error) {
    console.log(`Error in Opening Services ${error}`);
  }
};

//update jobs
const updateJob = async (obj: jobObj, id: string) => {
  try {
    const updated = await Job.findByIdAndUpdate(id, {
      $set: {
        title: obj.title,
        salary: obj.salary,
        discription: obj.discription,
        requirements: obj.requirements,
      },
    });
    return updated;
  } catch (error) {
    console.log(error);
  }
};

//delete jobs from DB
const deleteJob = async (id: string) => {
  try {
    const deleted = await Job.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.log(error);
  }
};

//get Applicants
// const getApplicants = async () => {
//   try {
//     const applicaints = await Job.find();
//     let allDetails: Object[] = [];
//     let noApplicationDetails: Object[] = [];

//     await Promise.all(
//       applicaints.map(async (ids) => {
//         if (ids.applicantsId.length >= 1) {
//           let details = await Promise.all(
//             ids.applicantsId.map(async (id) => {
//               const applicaintDetail = await User.findById(id);
//               return applicaintDetail;
//             })
//           );

//           allDetails = allDetails.concat(details);
//         } else {
//           noApplicationDetails.push({ "no applications fors ": ids.title });
//         }
//       })
//     );

//     allDetails = allDetails.concat(noApplicationDetails);
//     return allDetails;
//   } catch (error) {
//     console.log(error);
//   }
// };

const getApplicants = async (obj: ParsedQs) => {
  const { page, limit } = obj;

  const results = User.aggregate([
    {
      $lookup : {
      from :"jobs",
      localField: "appliedTo",
      foreignField: "_id",
      as: "appliedTo",
    }},
    { $unwind: "$appliedTo" },
    {
      $project: {
        _id: 0,
        name: 1,
        experience: 1,
        graduationYear: 1,
        discription: 1,
        appliedTo  : "$appliedTo.title",
      },
    },
  ]);  
  const options: object = { page, limit };
  const response = await User.aggregatePaginate(results, options)
    .then((result) => result)
    .catch((err: Error) => console.log(err));
    return response;
  // console.log(response);
  
};

//get fillterd applications 
const filterdApplications = async (reqQuery: ParsedQs) => {
  const { search, page, limit } = reqQuery;
  const colm = ["name", "experience", "discription" , "appliedTo" ];
  const or: { [x: string]: { $regex: string; $options: string } }[]  &{ [x: string]: mongoose.Types.ObjectId  }[] = [];
  const filterQuery: orInterface = { $or: [] };
  if (typeof search== "string") {
    let trimStr: string = search.trim();
    
      
    colm.forEach((clm) => {
      { or.push({
        [clm]: { $regex: `.*${trimStr}.*`, $options: "i" }
      });
    }
     console.log(or);
      
    });
    filterQuery.$or = or;
  }
  const results =  User.aggregate([ 
    { $match: filterQuery },
    {$lookup : {
      from :"jobs",
      localField: "appliedTo",
      foreignField: "_id",
      as: "appliedTo",
    }},
    { $unwind: "$appliedTo" },
    {
      $project: {
        _id: 0,
        name: 1,
        experience: 1,
        graduationYear: 1,
        discription: 1,
        appliedTo  : "$appliedTo.title",
      },
    },
  ]);
  // console.log(results); 
  
  const options: object = { page, limit };
  const response = await User.aggregatePaginate(results, options)
    .then((result) => result)
    .catch((err: Error) => console.log(err));
    // console.log(response)
    
  return response;
};

// //User get 
// const getUser = async (obj: Loginbody): Promise<newUser | null> => {
//   const getUser: newUser | null = await User.findOne({ email: obj.email });
//   return getUser;
// };

export {
  addjobOpeninigs,
  getApplicants,
  updateJob,
  deleteJob,
  viewjobOpeninigs,
  // getUser,
  filterdApplications,
  viewjobByIdOpeninigs,
};
