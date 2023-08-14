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
exports.viewJobsByIdController = exports.filterApplicants = exports.allApplicants = exports.viewJobsController = exports.deleteJobsController = exports.updateJobsController = exports.addJobsController = void 0;
const OpeningsServices_1 = require("../Services/OpeningsServices");
//Send all the existig jobs 
const viewJobsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingJobs = yield (0, OpeningsServices_1.viewjobOpeninigs)();
    return res.status(200).send(existingJobs);
});
exports.viewJobsController = viewJobsController;
const viewJobsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingJobs = yield (0, OpeningsServices_1.viewjobByIdOpeninigs)(req.params.id);
    return res.status(200).send(existingJobs);
});
exports.viewJobsByIdController = viewJobsByIdController;
//Add job Openings
const addJobsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saved = yield (0, OpeningsServices_1.addjobOpeninigs)(req.body);
    console.log(req.body, saved);
    return res.status(200).send(`Job saved ${saved}`);
});
exports.addJobsController = addJobsController;
//Edit existing job details
const updateJobsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updated = yield (0, OpeningsServices_1.updateJob)(req.body, id);
    return res.status(200).send(`Job updated ${updated}`);
});
exports.updateJobsController = updateJobsController;
//Delete jobs by ID  
const deleteJobsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleted = yield (0, OpeningsServices_1.deleteJob)(id);
    // return res.status(200).send(`Job deleted ${deleted}`)
});
exports.deleteJobsController = deleteJobsController;
//see all applicatints
const allApplicants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const applicants = yield (0, OpeningsServices_1.getApplicants)();
    console.log(applicants);
    return res.send(`Job applicaints With Job details ${applicants}`);
});
exports.allApplicants = allApplicants;
//get filterd applications by Job id
const filterApplicants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterd = yield (0, OpeningsServices_1.filterdApplications)(req.params.id);
    res.send(`Fillterd Applications ${filterd}`);
});
exports.filterApplicants = filterApplicants;
