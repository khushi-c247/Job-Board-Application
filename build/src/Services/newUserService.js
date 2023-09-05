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
exports.resetService = exports.passwordService = exports.deleteUser = exports.updateUser = exports.login = exports.createNewUser = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const applicaintMailer_1 = require("../Mailer/applicaintMailer");
const bull_1 = __importDefault(require("bull"));
const applicaintMailer_2 = require("../Mailer/applicaintMailer");
// Create a new User to DataBase
const createNewUser = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const scheduler = new bull_1.default('createUserQueue');
    const main = () => __awaiter(void 0, void 0, void 0, function* () {
        yield scheduler.add(yield UserModel_1.default.create(obj));
    });
    const res = scheduler.process((job, done) => {
        done();
        console.log(job.data);
    });
    // scheduler.on('compleate', () => {
    //  console.log('done');
    // })
    main().catch(console.error);
});
exports.createNewUser = createNewUser;
let token;
//Forgot Password
const passwordService = (resetobj) => __awaiter(void 0, void 0, void 0, function* () {
    const userdetails = yield UserModel_1.default.findOne({ email: resetobj.email });
    if (userdetails) {
        const token = jsonwebtoken_1.default.sign({ email: resetobj.email }, "secret", {
            expiresIn: "1h",
        });
        console.log(userdetails);
        (0, applicaintMailer_1.resetPasswordMailer)(userdetails.name, resetobj.email, token);
        return true;
    }
    else {
        return false;
    }
});
exports.passwordService = passwordService;
//Reset password
const resetService = (user, passwordObj, token) => __awaiter(void 0, void 0, void 0, function* () {
    const id = user._id;
    (0, applicaintMailer_2.passwordChanged)(user.email);
    const userdetails = yield UserModel_1.default.findById(id);
    if ((userdetails === null || userdetails === void 0 ? void 0 : userdetails.token) !== token) {
        const userPassword = yield UserModel_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, passwordObj), { token: token }));
        return true;
    }
    else {
        return false;
    }
});
exports.resetService = resetService;
//Update an existing User
const updateUser = (user, obj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = user._id;
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
//Delete an existing User
const deleteUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = user._id;
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
        return res.status(401).json({ message: "User not found" });
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
