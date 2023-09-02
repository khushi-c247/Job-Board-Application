"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonRouter = exports.adminRouter = exports.userRouter = void 0;
const userRouter_1 = __importDefault(require("./userRouter"));
exports.userRouter = userRouter_1.default;
const adminRouter_1 = __importDefault(require("./adminRouter"));
exports.adminRouter = adminRouter_1.default;
const commonRouter_1 = __importDefault(require("./commonRouter"));
exports.commonRouter = commonRouter_1.default;
