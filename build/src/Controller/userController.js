"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jobApplicaionServices_1 = __importDefault(require("../Services/jobApplicaionServices"));
// //Job Openinigs
// const userController = (req:Request , res:Response) =>{
//     // const mangeOpenings  = managementOpeninigs();
//     const devOpeninigs = developerOpeninigs()
//     return res.send(`Mangement Openings :${mangeOpenings} Developer Openings :${devOpeninigs}`) 
// }
//Job Application
const newApplication = (req, res) => {
    (0, jobApplicaionServices_1.default)(req.body);
    return res.send("Application submited");
};
exports.default = newApplication;
