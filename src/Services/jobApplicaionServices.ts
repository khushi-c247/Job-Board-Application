import User from "../Model/UserModel";
import Job from "../Model/JobModel";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
import { mailuser } from "../Mailer/applicaintMailer";
import {
  application,
  sorting,
  search,
  orInterface,
  reqUser,
} from "../interfaces/interfaces";
import Redis from "ioredis";
const redis = new Redis();

//create job application
const createAplication = async (user: reqUser, obj: application) => {
  await Job.findByIdAndUpdate(obj.jobId, {
    $addToSet: { applicantsId: obj.userId },
  });
  await User.findByIdAndUpdate(obj.userId, {
    $addToSet: { appliedTo: obj.jobId },
  });
  // for mailer
  const userDetails = await User.findById(user._id);
  const jobDetails = await Job.findById(obj.jobId);
  if (userDetails?.email && jobDetails?.title) {
    console.log("mail runnning");

    mailuser(userDetails.email, jobDetails.title);
  }
};

// get existing job openings from DB
// const getJobListings = async () => {
//   const result = await Job.find();
//   return result;
// };

// get existing job openings by id from DB
const getJobListingsId = async (id: string) => {
  const result = await Job.findById(id);
  return result;
};

const sorting = async (obj: sorting, queryObj: ParsedQs) => {
  // Sort by salary
  const page = queryObj.page;
  const limit = queryObj.limit;
  let sort = {};
  const colm: string = obj.colm;
  const order: number = obj.order;
  if (colm) {
    sort = { [colm]: order };
  }
  const result = Job.aggregate([
    { $sort: sort },
    {
      $project: {
        _id: 0,
        title: 1,
        salary: 1,
      },
    },
  ]);
  const options: object = { page, limit };
  const response = await Job.aggregatePaginate(result, options)
    .then((result) => result)
    .catch((err: Error) => console.log(err));
  return response;
};

//Get my jobs
const myJobs = async (user: reqUser, queryObj: ParsedQs) => {
  const page = queryObj.page;
  const limit = queryObj.limit;
  const id = user._id!;
  try {
    const result = User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      {
        $lookup: {
          from: "jobs",
          localField: "appliedTo",
          foreignField: "_id",
          as: "appliedTo",
        },
      },
      { $unwind: "$appliedTo" },
      {
        $project: {
          title: "$appliedTo.title",
          _id: 0,
        },
      },
    ]);
    const options: object = { page, limit };
    const response = await Job.aggregatePaginate(result, options)
      .then((result) => result)
      .catch((err: Error) => console.log(err));
    return response;
  } catch (error) {
    console.log(`error in myJobs`);
    return error;
  }
};

// const serchService = async (obj: search) => 

//   const { search, page, limit } = obj;
//   const colm = ["title", "discription", "requirements"];
//   const or: { [x: string]: { $regex: string; $options: string } }[] = [];
//   const filterQuery: orInterface = { $or: [] };
//   if (search) {
//     const trimStr: string = search.trim();
//     colm.forEach((clm) => {
//       or.push({
//         [clm]: { $regex: `.*${trimStr}.*`, $options: "i" },
//       });
//     });
//     filterQuery.$or = or;
//   }

//   //Through Offset
//   // const results = await Job.aggregate([
//   //   {
//   //     $match: filterQuery,
//   //   },
//   //   {
//   //     $project: {
//   //       _id: 0,
//   //       title: 1,
//   //       discription: 1,
//   //       requirements: 1,
//   //       salary: 1,
//   //     },
//   //   },
//   //   { $skip: page },
//   //   { $limit: limit },
//   // ]);
//   // return result

//   //Using cursor pagination
//   const results = Job.aggregate([
//     { $match: filterQuery },
//     {
//       $project: {
//         _id: 0,
//         title: 1,
//         discription: 1,
//         requirements: 1,
//         salary: 1,
//       },
//     },
//   ]);
//   const options: object = { page, limit };
//   const response = await Job.aggregatePaginate(results, options)
//     .then((result) => result)
//     .catch((err: Error) => console.log(err));
//   return response;
    
// };


//Serch service 
  
const serchService = async (obj: search) => {
    const { search , page, limit } = obj;
    const colm = ["title", "discription", "requirements"];
  const or: { [x: string]: { $regex: string; $options: string } }[] = [];
  const filterQuery: orInterface = { $or: [] };
 
  if (search) {
    // removeCache()
    const trimStr: string = search.trim();
    colm.forEach((clm) => {
      or.push({
        [clm]: { $regex: `.*${trimStr}.*`, $options: "i" },
      });
    });
    filterQuery.$or = or;
  }

  const cachedData = await redis.get(`response?colm=${search}?page=${page}?limit=${limit}`);

  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    console.log(parsedData);
    return parsedData;
  } 
  else {
    console.log("No cached data");
    // const offset = (page - 1) * limit;
    const results = await Job.aggregate([
      { $match: filterQuery },
      {
        $project: {
          _id: 0,
          title: 1,
          discription: 1,
          requirements: 1,
          salary: 1,
        },
      },
      { $skip: page },
      { $limit: limit },
    ]);
      // Using cursor pagination
      // const results = Job.aggregate([
      //   { $match: filterQuery },
      //   {
      //     $project: {
      //       _id: 0,
      //       title: 1,
      //       discription: 1,
      //       requirements: 1,
      //       salary: 1,
      //     },
      //   },
      // ]);
      // const options: object = { page, limit };
      // const response = await Job.aggregatePaginate(results, options)
      //   .then((result) => result)
      //   .catch((err: Error) => console.log(err));
      // return response;
    redis.set(`response?colm=${search}?page=${page}?limit=${limit}`, JSON.stringify(results));
    console.log(results);

    return results;
  }
};




export {
  createAplication,
  // getJobListings,
  getJobListingsId,
  sorting,
  myJobs,
  serchService,
};
