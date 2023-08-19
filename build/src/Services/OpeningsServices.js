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
exports.viewjobByIdOpeninigs = exports.filterdApplications = exports.getUser = exports.viewjobOpeninigs = exports.deleteJob = exports.updateJob = exports.addjobOpeninigs = void 0;
const JobModel_1 = __importDefault(require("../Model/JobModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
//View added jobs
const viewjobOpeninigs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield JobModel_1.default.find();
        return jobs;
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
        const updated = yield JobModel_1.default.findByIdAndUpdate(id, { $set: { title: obj.title, salary: obj.salary, discription: obj.discription, requirements: obj.requirements } });
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
const filterdApplications = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filtred = yield JobModel_1.default.findById(id);
        const filterdUsers = [];
        if (filtred && filtred.applicantsId) {
            yield Promise.all(filtred.applicantsId.map((ids) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield UserModel_1.default.findById(ids);
                if (user) {
                    filterdUsers.push(user);
                }
            })));
        }
        return filterdUsers;
    }
    catch (error) {
        console.log(error);
    }
});
exports.filterdApplications = filterdApplications;
//User get
const getUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const getUser = yield UserModel_1.default.findOne({ email: obj.email });
    return getUser;
});
exports.getUser = getUser;
