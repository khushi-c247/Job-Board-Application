"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
exports.default = () => {
    mongoose_1.default
        .connect(env_1.DB_URL)
        .then(() => console.log("DB connected at", { DB_URL: env_1.DB_URL }))
        .catch(() => console.log("errorin DB"));
};
