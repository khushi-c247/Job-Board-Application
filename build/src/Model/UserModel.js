"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    experience: {
        type: Number,
        require: true,
    },
    discription: {
        type: String,
        require: true,
    },
    graduationYear: {
        type: Number,
        require: true
    },
    appliedTo: {
        type: [String],
        unique: true
    }
});
exports.default = mongoose_1.default.model("user", user);
