"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Jobschema = new mongoose_1.default.Schema({
    type: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    }
});
exports.default = mongoose_1.default.model("job", Jobschema);
