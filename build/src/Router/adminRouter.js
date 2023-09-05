"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../Controller/index");
const auth_1 = __importDefault(require("../Middleware/auth"));
const loginPassport_1 = __importDefault(require("../config/loginPassport"));
const constants_1 = require("../helper/constants");
const router = express_1.default.Router();
// Admin Routers
router.post("/add-job", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.addJobsController);
router.patch("/update-job/:id", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.updateJobsController);
router.delete("/delete-job/:id", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.deleteJobsController);
router.get('/getAllApplicatins', loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.applicaints);
// get user through email
// router.get(
//   "/getUser",
//   passport.authenticate("jwt", { session: false }),
//   authorization(admin),
//   getUserController
// );
//TODO:Impliment serch functionality
// Applicaints router
// see all applicatints: includes pagination and aggrigation
router.get("/get-applications", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.allApplicants);
//can filter out applicaints through "name", "experience", "discription" , "appliedTo"
router.get("/filter-applications", loginPassport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.filterApplicants);
exports.default = router;
