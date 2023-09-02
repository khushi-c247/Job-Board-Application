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
exports.deleteUserController = exports.updateUserController = exports.JobserchController = exports.GetmyJobs = exports.sortController = exports.loginController = exports.findJob = exports.newUsercrete = exports.newApplication = exports.jobListing = void 0;
const jobApplicaionServices_1 = require("../Services/jobApplicaionServices");
const newUserService_1 = require("../Services/newUserService");
// import {
//   getJobListings,createAplication , getJobListingsId, sorting ,myJobs, serchService , createNewUser,  login, updateUser , deleteUser
// } from '../Services/index'
//Job Openinigs
const jobListing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getjobListing = yield (0, jobApplicaionServices_1.getJobListings)();
        res.status(200).json({ "Active job listings:": getjobListing });
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
        let user = req.user;
        yield (0, jobApplicaionServices_1.createAplication)(user, req.body);
        // res.status(200).json({message : "Your application has been submitted!"})
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
        res.status(200).json({ "User created:": user });
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.newUsercrete = newUsercrete;
//Find jobs By id : REMOVE
const findJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getjobListingId = yield (0, jobApplicaionServices_1.getJobListingsId)(req.params.id);
        res.status(200).json({ "Job listnings:": getjobListingId });
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.findJob = findJob;
//Sorting
const sortController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sorted = yield (0, jobApplicaionServices_1.sorting)(req.body, req.query);
        res.status(200).json({ "sorted data:": sorted });
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.sortController = sortController;
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
//
const GetmyJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        const myJob = yield (0, jobApplicaionServices_1.myJobs)(user, req.query);
        res.status(200).json({ "You have applied to these following jobs:": myJob });
    }
    catch (error) {
        console.log("error in GetMy jobs controller");
        next();
    }
});
exports.GetmyJobs = GetmyJobs;
//Serching Jobs through "title", "discription", "requirements"
const JobserchController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = yield (0, jobApplicaionServices_1.serchService)(req.body);
        res.status(200).json({ "serched data:": search });
    }
    catch (error) {
        console.log(error, "error in serchController");
        next(error);
    }
});
exports.JobserchController = JobserchController;
const updateUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        yield (0, newUserService_1.updateUser)(user, req.body);
        // return updatedUser
        res.status(200).json({ message: " Your details has been changed successfully! " });
    }
    catch (error) {
        console.log("error in user controller");
        next(error);
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        yield (0, newUserService_1.deleteUser)(user);
        res.status(200).json({ message: " Your account has been deleted! :(" });
    }
    catch (error) {
        console.log(" in user controller delete user");
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
