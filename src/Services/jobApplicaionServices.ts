import User from "../Model/UserModel";
import Job from "../Model/JobModel";
import mongoose from "mongoose";
// import mailuser from "../Mailer/applicaintMailer";
import { application, sorting } from "../interfaces/interfaces";

//create job application
const createAplication = async (obj: application) => {
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

const sorting = async (obj: sorting) => {
  // Sort by salary
  let sort = {};
  sort = { salary: 1 };
  const colm: string = obj.colm;
  const order: number = obj.order;
  if (colm) {
    sort = { [colm]: order };
  }
  const result = await Job.aggregate([
    { $sort: sort },
    {
      $project: {
        _id: 0,
        title: 1,
        salary: 1,
      },
    },
    {
      $limit: 5,
    },
  ]);
  return result;
};

//Get my jobs
const myJobs = async (id: string) => {
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
};

interface search {
  search: string;
  page: number;
  limit: number;
}
interface orInterface {
  $or: { [x: string]: { $regex: string; $options: string } }[];
}
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
  console.log(filterQuery);
  const result = await Job.aggregate([
    {
      $match: filterQuery,
    },
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
  return result;

  //Using cursor pagination

  //   const options = { page, limit };
  //   console.log("this is result-------->>>",result);

  //   const response = await Job.aggregatePaginate(result, options)
  //     .then((result: []) => result)
  //     .catch((err: Error) => console.log(err));
  //    console.log("this is response pagination------->>>>>",response);
  //   return response;
};

export {
  createAplication,
  getJobListings,
  getJobListingsId,
  sorting,
  myJobs,
  serchService,
};
