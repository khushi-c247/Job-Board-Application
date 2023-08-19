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
exports.loginController = exports.findJob = exports.newUsercrete = exports.newApplication = exports.jobListing = void 0;
const jobApplicaionServices_1 = require("../Services/jobApplicaionServices");
const newUserService_1 = require("../Services/newUserService");
//Job Openinigs
const jobListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getjobListing = yield (0, jobApplicaionServices_1.getJobListings)();
        return res.send(`Job Openings :${getjobListing}`);
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.jobListing = jobListing;
//Job Application
const newApplication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, jobApplicaionServices_1.createAplication)(req.body);
        return res.send("Application submited");
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.newApplication = newApplication;
//New User
const newUsercrete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, newUserService_1.createNewUser)(req.body);
        return res.send(`User Created! ${user}`);
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.newUsercrete = newUsercrete;
//Find jobs By id
const findJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getjobListingId = yield (0, jobApplicaionServices_1.getJobListingsId)(req.params.id);
        return res.send(`Job Openings :${getjobListingId}`);
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.findJob = findJob;
//LoginUser
const loginController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, newUserService_1.login)(req, res);
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.loginController = loginController;
