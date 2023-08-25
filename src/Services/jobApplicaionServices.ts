import User from "../Model/UserModel";
import Job from "../Model/JobModel";
import mongoose from "mongoose";
import { ParsedQs } from "qs";
// import mailuser from "../Mailer/applicaintMailer";
import {
  application,
  sorting,
  search,
  orInterface,
} from "../interfaces/interfaces";

//create job application
const createAplication = async (user: any, obj: application) => {
  if (user._id !== obj.userId) {
    throw new Error("User not match");
  }
  await Job.findByIdAndUpdate(obj.jobId, {
    $addToSet: { applicantsId: obj.userId },
  });
  await User.findByIdAndUpdate(obj.userId, {
    $addToSet: { appliedTo: obj.jobId },
  });
  // for mailer
  const userDetails = await User.findById(obj.userId);
  const jobDetails = await Job.findById(obj.jobId);
  if (userDetails?.email && jobDetails?.title) {
    // mailuser(userDetails.email,jobDetails.title)
  }
};

// get existing job openings from DB
const getJobListings = async () => {
  const result = await Job.find();
  return result;
};

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
const myJobs = async (user: any, id: string) => {
  try {
    if (user._id != id) {
      throw new Error("User not match");
    }
    const result = await User.aggregate([
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
    return result;
  } catch (error) {
    console.log(`error in myJobs`);
    return error;
  }
};

// Serch service
const serchService = async (obj: search) => {
  const { search, page, limit } = obj;
  const colm = ["title", "discription", "requirements"];
  const or: { [x: string]: { $regex: string; $options: string } }[] = [];
  const filterQuery: orInterface = { $or: [] };
  if (search) {
    const trimStr: string = search.trim();
    colm.forEach((clm) => {
      or.push({
        [clm]: { $regex: `.*${trimStr}.*`, $options: "i" },
      });
    });
    filterQuery.$or = or;
  }

  //Through Offset
  // const results = await Job.aggregate([
  //   {
  //     $match: filterQuery,
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       title: 1,
  //       discription: 1,
  //       requirements: 1,
  //       salary: 1,
  //     },
  //   },
  //   { $skip: page },
  //   { $limit: limit },
  // ]);
  // return result

  //Using cursor pagination
  const results = Job.aggregate([
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
  ]);
  const options: object = { page, limit };
  const response = await Job.aggregatePaginate(results, options)
    .then((result) => result)
    .catch((err: Error) => console.log(err));
  return response;
};

export {
  createAplication,
  getJobListings,
  getJobListingsId,
  sorting,
  myJobs,
  serchService,
};
