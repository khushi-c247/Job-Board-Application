"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const validators_1 = __importDefault(require("../Middleware/validators"));
const auth_1 = __importDefault(require("../Middleware/auth"));
const upload_1 = __importDefault(require("../helper/upload"));
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("../helper/constants");
const passport_1 = __importDefault(require("../config/passport"));
const router = express_1.default.Router();
router.use(body_parser_1.default.urlencoded({ extended: true }));
//User routers
router.post("/job-application", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.newApplication);
router.post("/login", validators_1.default, userController_1.loginController);
router.put("/update-user/:id", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.updateUserController);
router.delete('/delete/:id', passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.deleteUserController);
router.get("/getmyJob", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.GetmyJobs);
//Upload Resumes
router.post("/resume", upload_1.default.array("resume"));
exports.default = router;
