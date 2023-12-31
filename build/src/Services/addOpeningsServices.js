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
exports.deleteJob = exports.updateJob = exports.addjobOpeninigs = void 0;
const JobModel_1 = __importDefault(require("../Model/JobModel"));
// add jobs 
const addjobOpeninigs = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const created = yield JobModel_1.default.create({ title: obj.title, salary: obj.salary, discription: obj.discription, requirements: obj.requirements });
    return created;
});
exports.addjobOpeninigs = addjobOpeninigs;
//update jobs
const updateJob = (obj, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = yield JobModel_1.default.findByIdAndUpdate(id, { $set: { title: obj.title, salary: obj.salary, discription: obj.discription, requirements: obj.requirements } });
    return updated;
});
exports.updateJob = updateJob;
//delete jobs
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield JobModel_1.default.findByIdAndDelete(id);
    return deleted;
});
exports.deleteJob = deleteJob;
