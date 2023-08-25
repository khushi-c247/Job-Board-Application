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
exports.serchService = exports.myJobs = exports.sorting = exports.getJobListingsId = exports.getJobListings = exports.createAplication = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const JobModel_1 = __importDefault(require("../Model/JobModel"));
const mongoose_1 = __importDefault(require("mongoose"));
//create job application
const createAplication = (user, obj) => __awaiter(void 0, void 0, void 0, function* () {
    if (user._id !== obj.userId) {
        throw new Error("User not match");
    }
    yield JobModel_1.default.findByIdAndUpdate(obj.jobId, {
        $addToSet: { applicantsId: obj.userId },
    });
    yield UserModel_1.default.findByIdAndUpdate(obj.userId, {
        $addToSet: { appliedTo: obj.jobId },
    });
    // for mailer
    const userDetails = yield UserModel_1.default.findById(obj.userId);
    const jobDetails = yield JobModel_1.default.findById(obj.jobId);
    if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.email) && (jobDetails === null || jobDetails === void 0 ? void 0 : jobDetails.title)) {
        // mailuser(userDetails.email,jobDetails.title)
    }
});
exports.createAplication = createAplication;
// get existing job openings from DB
const getJobListings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield JobModel_1.default.find();
    return result;
});
exports.getJobListings = getJobListings;
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
const myJobs = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user._id != id) {
            throw new Error("User not match");
        }
        const result = yield UserModel_1.default.aggregate([
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
        return result;
    }
    catch (error) {
        console.log(`error in myJobs`);
        return error;
    }
});
exports.myJobs = myJobs;
// Serch service
const serchService = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, limit } = obj;
    const colm = ["title", "discription", "requirements"];
    const or = [];
    const filterQuery = { $or: [] };
    if (search) {
        const trimStr = search.trim();
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
    const results = JobModel_1.default.aggregate([
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
    const options = { page, limit };
    const response = yield JobModel_1.default.aggregatePaginate(results, options)
        .then((result) => result)
        .catch((err) => console.log(err));
    return response;
});
exports.serchService = serchService;
