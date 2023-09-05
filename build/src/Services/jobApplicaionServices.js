"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serchService = exports.myJobs = exports.sorting = exports.getJobListingsId = exports.createAplication = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const JobModel_1 = __importDefault(require("../Model/JobModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const applicaintMailer_1 = require("../Mailer/applicaintMailer");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
//create job application
const createAplication = (user, obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield JobModel_1.default.findByIdAndUpdate(obj.jobId, {
        $addToSet: { applicantsId: obj.userId },
    });
    yield UserModel_1.default.findByIdAndUpdate(obj.userId, {
        $addToSet: { appliedTo: obj.jobId },
    });
    // for mailer
    const userDetails = yield UserModel_1.default.findById(user._id);
    const jobDetails = yield JobModel_1.default.findById(obj.jobId);
    if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.email) && (jobDetails === null || jobDetails === void 0 ? void 0 : jobDetails.title)) {
        console.log("mail runnning");
        (0, applicaintMailer_1.mailuser)(userDetails.email, jobDetails.title);
    }
});
exports.createAplication = createAplication;
// get existing job openings from DB
// const getJobListings = async () => {
//   const result = await Job.find();
//   return result;
// };
// get existing job openings by id from DB
const getJobListingsId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield JobModel_1.default.findById(id);
    return result;
});
exports.getJobListingsId = getJobListingsId;
const sorting = (obj, queryObj) => __awaiter(void 0, void 0, void 0, function* () {
    // Sort by salary
    const page = queryObj.page;
    const limit = queryObj.limit;
    let sort = {};
    const colm = obj.colm;
    const order = obj.order;
    if (colm) {
        sort = { [colm]: order };
    }
    const result = JobModel_1.default.aggregate([
        { $sort: sort },
        {
            $project: {
                _id: 0,
                title: 1,
                salary: 1,
            },
        },
    ]);
    const options = { page, limit };
    const response = yield JobModel_1.default.aggregatePaginate(result, options)
        .then((result) => result)
        .catch((err) => console.log(err));
    return response;
});
exports.sorting = sorting;
//Get my jobs
const myJobs = (user, queryObj) => __awaiter(void 0, void 0, void 0, function* () {
    const page = queryObj.page;
    const limit = queryObj.limit;
    const id = user._id;
    try {
        const result = UserModel_1.default.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
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
        const options = { page, limit };
        const response = yield JobModel_1.default.aggregatePaginate(result, options)
            .then((result) => result)
            .catch((err) => console.log(err));
        return response;
    }
    catch (error) {
        console.log(`error in myJobs`);
        return error;
    }
});
exports.myJobs = myJobs;
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
const serchService = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, limit } = obj;
    const colm = ["title", "discription", "requirements"];
    const or = [];
    const filterQuery = { $or: [] };
    if (search) {
        // removeCache()
        const trimStr = search.trim();
        colm.forEach((clm) => {
            or.push({
                [clm]: { $regex: `.*${trimStr}.*`, $options: "i" },
            });
        });
        filterQuery.$or = or;
    }
    const cachedData = yield redis.get(`response?colm=${search}?page=${page}?limit=${limit}`);
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        console.log(parsedData);
        return parsedData;
    }
    else {
        console.log("No cached data");
        // const offset = (page - 1) * limit;
        const results = yield JobModel_1.default.aggregate([
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
});
exports.serchService = serchService;
