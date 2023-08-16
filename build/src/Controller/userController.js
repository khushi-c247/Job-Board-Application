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
exports.loginController = exports.getUserController = exports.findJob = exports.newUsercrete = exports.newApplication = exports.jobListing = void 0;
const jobApplicaionServices_1 = require("../Services/jobApplicaionServices");
const newUserService_1 = require("../Services/newUserService");
//Job Openinigs
const jobListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getjobListing = yield (0, jobApplicaionServices_1.getJobListings)();
    return res.send(`Job Openings :${getjobListing}`);
});
exports.jobListing = jobListing;
//Job Application
const newApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, jobApplicaionServices_1.createAplication)(req.body);
    // console.log(req.body);
    return res.send("Application submited");
});
exports.newApplication = newApplication;
//New User 
const newUsercrete = (req, res) => {
    (0, newUserService_1.createNewUser)(req.body);
    return res.send("User Created!");
};
exports.newUsercrete = newUsercrete;
//find jobs By id
const findJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getjobListingId = yield (0, jobApplicaionServices_1.getJobListingsId)(req.params.id);
    return res.send(`Job Openings :${getjobListingId}`);
});
exports.findJob = findJob;
//getUser
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, newUserService_1.getUser)(req.body);
    res.send(result);
});
exports.getUserController = getUserController;
//loginUser
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, newUserService_1.login)(req, res);
});
exports.loginController = loginController;
