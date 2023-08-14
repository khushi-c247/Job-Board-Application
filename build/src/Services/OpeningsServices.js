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
exports.viewjobByIdOpeninigs = exports.filterdApplications = exports.getApplicants = exports.viewjobOpeninigs = exports.deleteJob = exports.updateJob = exports.addjobOpeninigs = void 0;
const JobModel_1 = __importDefault(require("../Model/JobModel"));
const UserModel_1 = __importDefault(require("../Model/UserModel"));
//View added jobs
const viewjobOpeninigs = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield JobModel_1.default.find();
    return jobs;
});
exports.viewjobOpeninigs = viewjobOpeninigs;
//View jobs by id
const viewjobByIdOpeninigs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getJobById = yield JobModel_1.default.findById(id);
    return getJobById;
});
exports.viewjobByIdOpeninigs = viewjobByIdOpeninigs;
// Add jobs to the DB 
const addjobOpeninigs = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const created = yield JobModel_1.default.create({ title: obj.title, discription: obj.discription, requirements: obj.requirements, salary: obj.salary });
        return created;
    }
    catch (error) {
        console.log("ERROR!!", error);
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
const getApplicants = () => __awaiter(void 0, void 0, void 0, function* () {
    const applicaints = yield JobModel_1.default.find();
    let allDetails = [];
    let noApplicationDetails = [];
    yield Promise.all(applicaints.map((ids) => __awaiter(void 0, void 0, void 0, function* () {
        if (ids.applicantsId.length >= 1) {
            let details = yield Promise.all(ids.applicantsId.map((id) => __awaiter(void 0, void 0, void 0, function* () {
                const applicaintDetail = yield UserModel_1.default.findById(id);
                return applicaintDetail;
            })));
            allDetails = allDetails.concat(details);
        }
        else {
            noApplicationDetails.push({ 'no applications fors ': ids.title });
        }
    })));
    allDetails = allDetails.concat(noApplicationDetails);
    return allDetails;
});
exports.getApplicants = getApplicants;
//get fillterd applications by JobID
const filterdApplications = (id) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.filterdApplications = filterdApplications;
