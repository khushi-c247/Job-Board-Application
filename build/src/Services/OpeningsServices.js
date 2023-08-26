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
exports.viewjobByIdOpeninigs = exports.filterdApplications = exports.getUser = exports.viewjobOpeninigs = exports.deleteJob = exports.updateJob = exports.getApplicants = exports.addjobOpeninigs = void 0;
const JobModel_1 = __importDefault(require("../Model/JobModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
//View added jobs
const viewjobOpeninigs = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            page: obj.page,
            limit: obj.limit,
        };
        const result = JobModel_1.default.aggregate([
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
        const response = yield JobModel_1.default.aggregatePaginate(result, options);
        return response;
    }
    catch (error) {
        console.log(`Error in Opening Services ${error}`);
    }
});
exports.viewjobOpeninigs = viewjobOpeninigs;
//View jobs by id
const viewjobByIdOpeninigs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getJobById = yield JobModel_1.default.findById(id);
        return getJobById;
    }
    catch (error) {
        console.log(`Error in Opening Services ${error}`);
    }
});
exports.viewjobByIdOpeninigs = viewjobByIdOpeninigs;
// Add jobs to the DB
const addjobOpeninigs = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield JobModel_1.default.create(obj);
        return created;
    }
    catch (error) {
        console.log(`Error in Opening Services ${error}`);
    }
});
exports.addjobOpeninigs = addjobOpeninigs;
//update jobs
const updateJob = (obj, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield JobModel_1.default.findByIdAndUpdate(id, {
            $set: {
                title: obj.title,
                salary: obj.salary,
                discription: obj.discription,
                requirements: obj.requirements,
            },
        });
        return updated;
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateJob = updateJob;
//delete jobs from DB
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield JobModel_1.default.findByIdAndDelete(id);
        return deleted;
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteJob = deleteJob;
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
const getApplicants = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = obj;
    const results = UserModel_1.default.aggregate([
        {
            $lookup: {
                from: "jobs",
                localField: "appliedTo",
                foreignField: "_id",
                as: "appliedTo",
            }
        },
        { $unwind: "$appliedTo" },
        {
            $project: {
                _id: 0,
                name: 1,
                experience: 1,
                graduationYear: 1,
                discription: 1,
                appliedTo: "$appliedTo.title",
            },
        },
    ]);
    const options = { page, limit };
    const response = yield UserModel_1.default.aggregatePaginate(results, options)
        .then((result) => result)
        .catch((err) => console.log(err));
    return response;
    // console.log(response);
});
exports.getApplicants = getApplicants;
//get fillterd applications by JobID
const filterdApplications = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page, limit } = obj;
    const colm = ["name", "experience", "discription", "appliedTo"];
    const or = [];
    const filterQuery = { $or: [] };
    if (typeof search == "string") {
        let trimStr = search.trim();
        colm.forEach((clm) => {
            {
                or.push({
                    [clm]: { $regex: `.*${trimStr}.*`, $options: "i" }
                });
            }
            console.log(or);
        });
        filterQuery.$or = or;
    }
    const results = yield UserModel_1.default.aggregate([
        { $match: filterQuery },
        { $lookup: {
                from: "jobs",
                localField: "appliedTo",
                foreignField: "_id",
                as: "appliedTo",
            } },
        { $unwind: "$appliedTo" },
        {
            $project: {
                _id: 0,
                name: 1,
                experience: 1,
                graduationYear: 1,
                discription: 1,
                appliedTo: "$appliedTo.title",
            },
        },
    ]);
    console.log(results);
    const options = { page, limit };
    // const response = await Job.aggregatePaginate(results, options)
    //   .then((result) => result)
    //   .catch((err: Error) => console.log(err));
    // return response;
});
exports.filterdApplications = filterdApplications;
//User get
const getUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield UserModel_1.default.findOne({ email: obj.email });
    return getUser;
});
exports.getUser = getUser;
