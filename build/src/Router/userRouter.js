"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const router = express_1.default.Router();
router.get("/job-listing", userController_1.jobListing);
router.post("/job-application", userController_1.newApplication);
router.post("/new-user", userController_1.newUser);
exports.default = router;
