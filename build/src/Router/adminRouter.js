"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../Controller/adminController");
const router = express_1.default.Router();
// Admin Routers
router.get("/view-job", adminController_1.viewJobsController);
router.get("view-jobById/:id", adminController_1.viewJobsByIdController);
router.post('/add-job', adminController_1.addJobsController);
router.patch('/update-job/:id', adminController_1.updateJobsController);
router.delete('/delete-job/:id', adminController_1.deleteJobsController);
//applicaints router
router.get('/get-applications', adminController_1.allApplicants);
router.get('/filter-applications/:id', adminController_1.filterApplicants);
exports.default = router;
