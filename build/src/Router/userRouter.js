"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const auth_1 = __importDefault(require("../Middleware/auth"));
const upload_1 = __importDefault(require("../helper/upload"));
const body_parser_1 = __importDefault(require("body-parser"));
const constants_1 = require("../helper/constants");
const passport_1 = __importDefault(require("../config/passport"));
const router = express_1.default.Router();
router.use(body_parser_1.default.urlencoded({ extended: true }));
//User routers
router.post("/job-application", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.newApplication);
router.put("/update-user/:id", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.updateUserController);
//serching routers
// router.post("/find-job/:id", findJob);
// router.get("/job-openings", jobListing);
router.get("/getmyJob", userController_1.GetmyJobs);
//filter routers
//Upload Resumes
router.post("/resume", upload_1.default.array("resume"));
exports.default = router;
