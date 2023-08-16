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
exports.login = exports.getUser = exports.createNewUser = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Create a new User to DataBase
// const createNewUser = (obj: newUser) => {
//     user.create({ name: obj.name, email: obj.email, experience: obj.experience,
//         discription: obj.discription, graduationYear: obj.graduationYear })
// }
const createNewUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        obj.password = yield bcryptjs_1.default.hash(obj.password, 10);
        yield UserModel_1.default.create(obj);
        return "User Created";
    }
    catch (error) {
        console.log(error);
    }
});
exports.createNewUser = createNewUser;
//user get
const getUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(authUser);
    const getUser = yield UserModel_1.default.findOne({ email: obj.email });
    // console.log(getUser);
    return getUser;
});
exports.getUser = getUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userReqBody = req.body; // Use the correct type for userReqBody
        const loginUser = yield UserModel_1.default.findOne({ email: userReqBody.email });
        if (!loginUser) {
            return res.send("User not found");
        }
        const passwordMatch = yield bcryptjs_1.default.compare(userReqBody.password, loginUser.password);
        console.log(loginUser.password, userReqBody.password);
        if (!passwordMatch) {
            return res.send("Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign({ email: loginUser === null || loginUser === void 0 ? void 0 : loginUser.email, name: loginUser.name }, "secret", { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});
exports.login = login;
