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
exports.getJobListings = exports.createAplication = void 0;
const AppliModel_1 = __importDefault(require("../Model/AppliModel"));
const Job_listing_1 = __importDefault(require("../Model/Job-listing"));
//create job application
const createAplication = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield AppliModel_1.default.create({ name: obj.name, email: obj.email });
});
exports.createAplication = createAplication;
// get existing job openings from DB
const getJobListings = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Job_listing_1.default.find();
    return result;
});
exports.getJobListings = getJobListings;
