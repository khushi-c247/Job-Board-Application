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
exports.getJobListingsId = exports.getJobListings = exports.createAplication = void 0;
// import application from '../Model/AppliModel'
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const JobModel_1 = __importDefault(require("../Model/JobModel"));
//create job application
const createAplication = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield JobModel_1.default.findByIdAndUpdate(obj.jobId, {
        $addToSet: { applicantsId: obj.userId },
    });
    yield UserModel_1.default.findByIdAndUpdate(obj.userId, {
        $addToSet: { appliedTo: obj.jobId },
    });
    // for mailer
    const userDetails = yield UserModel_1.default.findById(obj.userId);
    const jobDetails = yield JobModel_1.default.findById(obj.jobId);
    if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.email) && (jobDetails === null || jobDetails === void 0 ? void 0 : jobDetails.title)) {
        // mailuser(userDetails.email,jobDetails.title)
    }
});
exports.createAplication = createAplication;
// get existing job openings from DB
const getJobListings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield JobModel_1.default.find();
    return result;
});
exports.getJobListings = getJobListings;
// get existing job openings by id from DB
const getJobListingsId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield JobModel_1.default.findById(id);
    return result;
});
exports.getJobListingsId = getJobListingsId;
