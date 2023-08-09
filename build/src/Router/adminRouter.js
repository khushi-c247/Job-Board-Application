"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../Controller/adminController");
const router = express_1.default.Router();
// Admin Routers
router.post('/add-job', adminController_1.addJobsController);
router.patch('/update-job/:id', adminController_1.updateJobsController);
router.delete('/delete-job/:id', adminController_1.deleteJobsController);
// router.post("/job-application", newApplicstion())
exports.default = router;
