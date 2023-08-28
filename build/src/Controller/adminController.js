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
Object.defineProperty(exports, "__esModule", { value: true });
exports.allApplicants = exports.viewJobsByIdController = exports.filterApplicants = exports.viewJobsController = exports.deleteJobsController = exports.updateJobsController = exports.addJobsController = void 0;
const OpeningsServices_1 = require("../Services/OpeningsServices");
//Send all the existig jobs
const viewJobsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingJobs = yield (0, OpeningsServices_1.viewjobOpeninigs)(req.query);
        return res.status(200).json({ "Jobs exist in DB": existingJobs });
    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error);
    }
});
exports.viewJobsController = viewJobsController;
//view by Id
const viewJobsByIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingJobs = yield (0, OpeningsServices_1.viewjobByIdOpeninigs)(req.params.id);
        return res.status(200).json({ "Job by Id": existingJobs });
    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error);
    }
});
exports.viewJobsByIdController = viewJobsByIdController;
//Add job Openings
const addJobsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saved = yield (0, OpeningsServices_1.addjobOpeninigs)(req.body);
        res.status(200).json({ "Job deleted ": saved });
    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error);
    }
});
exports.addJobsController = addJobsController;
//Edit existing job details
const updateJobsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updated = yield (0, OpeningsServices_1.updateJob)(req.body, id);
        return res.status(200).json({ "Job updated": updated });
    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error);
    }
});
exports.updateJobsController = updateJobsController;
//Delete jobs by ID
const deleteJobsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleted = yield (0, OpeningsServices_1.deleteJob)(id);
        return res.status(200).json({ "Job deleted ": deleted });
    }
    catch (error) {
        console.log(`error in admin Controler`);
        next(error);
    }
});
exports.deleteJobsController = deleteJobsController;
//GetUser
// const getUserController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const result = await getUser(req.body);
//     res.status(200).json({ User: result });
//   } catch (error) {
//     console.log("error in user controller");
//     next(error);
//   }
// };
// see all applicatints
const allApplicants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicants = yield (0, OpeningsServices_1.getApplicants)(req.query);
        // console.log(applicants);
        return res.status(200).json({ applicatints: applicants });
    }
    catch (error) {
        console.log(error);
    }
});
exports.allApplicants = allApplicants;
//get filterd applications by Job id
const filterApplicants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterd = yield (0, OpeningsServices_1.filterdApplications)(req.query);
        res.status(200).json({ "Filterd applications": filterd });
    }
    catch (error) {
        console.log(error);
    }
});
exports.filterApplicants = filterApplicants;
