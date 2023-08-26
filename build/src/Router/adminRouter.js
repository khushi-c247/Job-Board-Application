"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../Controller/index");
const auth_1 = __importDefault(require("../Middleware/auth"));
const passport_1 = __importDefault(require("../config/passport"));
const constants_1 = require("../helper/constants");
const router = express_1.default.Router();
// Admin Routers
router.post("/add-job", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.addJobsController);
router.patch("/update-job/:id", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.updateJobsController);
router.delete("/delete-job/:id", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.deleteJobsController);
//TODO:Impliment serch functionality
router.get("/getUser", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.getUserController);
//TODO:Impliment serch functionality
// Applicaints router
router.get('/get-applications', passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.default)(constants_1.admin), index_1.allApplicants);
router.get("/filter-applications", passport_1.default.authenticate("jwt", { session: false }), (0, auth_1.default)(constants_1.admin), index_1.filterApplicants);
exports.default = router;
