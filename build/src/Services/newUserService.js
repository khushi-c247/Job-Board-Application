"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../Model/UserModel"));
//Create New User
const createNewUser = (obj) => {
    UserModel_1.default.create({ name: obj.name, email: obj.email, experience: obj.experience });
};
exports.default = createNewUser;
