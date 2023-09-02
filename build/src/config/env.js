"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = exports.port = exports.key = exports.DB_TESTING = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_URL = (_a = process.env.DB_URL) !== null && _a !== void 0 ? _a : "";
exports.DB_TESTING = (_b = process.env.DB_TESTING) !== null && _b !== void 0 ? _b : "";
exports.key = process.env.KEY;
exports.port = process.env.PORT;
exports.Env = process.env.ENV;
