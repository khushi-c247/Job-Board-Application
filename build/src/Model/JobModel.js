"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const job = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true
    },
    discription: {
        type: String,
        require: true
    },
    requirements: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },
    applicantsId: {
        type: [String],
    }
});
exports.default = mongoose_1.default.model("job", job);
