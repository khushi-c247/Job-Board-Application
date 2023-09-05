"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let url;
if (process.env.NODE_ENV === "dev") {
    url = env_1.DB_URL;
}
else {
    url = env_1.DB_TESTING;
}
function dbConnection() {
    mongoose_1.default
        .connect(url)
        .then(() => console.log("DB connected at", { DB_URL: env_1.DB_URL }))
        .catch(() => console.log("error in DB"));
}
exports.dbConnection = dbConnection;
// //ERROR IN ENV!!
function testConnection() {
    mongoose_1.default
        .connect(url)
        .then(() => console.log("DB connected at"))
        .catch((err) => console.log("error in DB", err));
}
exports.testConnection = testConnection;
