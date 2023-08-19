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
exports.login = exports.createNewUser = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a new User to DataBase
const createNewUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    obj.password = yield bcryptjs_1.default.hash(obj.password, 10);
    yield UserModel_1.default.create(obj);
    return "User Created";
});
exports.createNewUser = createNewUser;
//Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userReqBody = req.body; // Use the correct type for userReqBody
    const loginUser = yield UserModel_1.default.findOne({ email: userReqBody.email });
    //Check if user exists
    if (!loginUser) {
        return res.send("User not found");
    }
    //Bycript password and match
    const passwordMatch = yield bcryptjs_1.default.compare(userReqBody.password, loginUser.password);
    if (!passwordMatch) {
        return res.send("Incorrect password");
    }
    //Generate Token
    const token = jsonwebtoken_1.default.sign({ email: loginUser === null || loginUser === void 0 ? void 0 : loginUser.email, name: loginUser.name }, "secret", { expiresIn: "1" });
    res.json({ message: "Login successful", token });
});
exports.login = login;
