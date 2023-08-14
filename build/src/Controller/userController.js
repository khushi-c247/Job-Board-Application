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
exports.newUser = exports.newApplication = exports.jobListing = void 0;
const jobApplicaionServices_1 = require("../Services/jobApplicaionServices");
const newUserService_1 = __importDefault(require("../Services/newUserService"));
// import {jobObj} from "../interfaces/reqRes"
//Job Openinigs
const jobListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getjobListing = yield (0, jobApplicaionServices_1.getJobListings)();
    return res.send(`Job Openings :${getjobListing}`);
});
exports.jobListing = jobListing;
//Job Application
const newApplication = (req, res) => {
    (0, jobApplicaionServices_1.createAplication)(req.body);
    return res.send("Application submited");
};
exports.newApplication = newApplication;
//New User 
const newUser = (req, res) => {
    (0, newUserService_1.default)(req.body);
    return res.send("User Created!");
};
exports.newUser = newUser;
