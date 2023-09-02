"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.key = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_URL = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
exports.key = process.env.KEY;
exports.port = process.env.PORT;
