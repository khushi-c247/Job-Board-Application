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
exports.deleteUser = exports.updateUser = exports.login = exports.createNewUser = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create a new User to DataBase
const createNewUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserModel_1.default.create(obj);
    return "User Created";
});
exports.createNewUser = createNewUser;
//Update an existing User
const updateUser = (user, id, obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user._id != id) {
            throw new Error("User not match");
        }
        const updated = yield UserModel_1.default.findByIdAndUpdate(id, Object.assign({}, obj));
        if (!updated) {
            return "User not found";
        }
        return updated;
    }
    catch (error) {
        console.log(error);
    }
    return "User Updated";
});
exports.updateUser = updateUser;
const deleteUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user._id != id) {
            throw new Error("User not match");
        }
        yield UserModel_1.default.findByIdAndDelete(id);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
//Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userReqBody = req.body;
    const loginUser = yield UserModel_1.default.findOne({
        email: userReqBody.email,
    });
    //Check if user exists
    if (!loginUser) {
        return res.send("User not found");
    }
    //Bcrypt password match
    const passwordMatch = yield loginUser.checkPassword(userReqBody.password);
    if (!passwordMatch) {
        return res.status(401).json({ message: "You have enterd wrong password!" }); //Chance condition
    }
    // Generate Token
    const token = jsonwebtoken_1.default.sign({ email: loginUser === null || loginUser === void 0 ? void 0 : loginUser.email, name: loginUser.name }, "secret", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
});
exports.login = login;
