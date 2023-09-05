"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../Controller/index");
const auth_1 = __importDefault(require("../Middleware/auth"));
const upload_1 = __importDefault(require("../helper/upload"));
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("../helper/constants");
const loginPassport_1 = __importDefault(require("../config/loginPassport"));
const resetPassport_1 = require("../config/resetPassport");
const router = express_1.default.Router();
router.use(body_parser_1.default.urlencoded({ extended: true }));
//User routers (CRUD)
router.post("/job-application", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), index_1.newApplication);
router.put("/update-user", loginPassport_1.default.authenticate("jwt", { session: false }), index_1.updateUserController);
router.delete("/delete", loginPassport_1.default.authenticate("jwt", { session: false }), index_1.deleteUserController);
//Get your job by user id (include pagination)
router.get("/getmyJob", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), index_1.GetmyJobs);
//view all job openings (include serching and pagination feature)
router.get("/view-job", index_1.JobserchController);
router.get("/view-jobById/:id", index_1.viewJobsByIdController);
//Sort job by any clm 
router.get("/sort", index_1.sortController);
//Upload Resumes
router.post("/resume", upload_1.default.array("resume"));
// router.put('/reset', emptyToken,demopassport.authenticate("jwt", { session: false }), resetPassword)
router.put('/reset', resetPassport_1.emptyToken, resetPassport_1.demopassport.authenticate("jwt", { session: false }), index_1.resetPassword);
exports.default = router;
