"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validators_1 = __importDefault(require("../Middleware/validators"));
const adminController_1 = require("../Controller/adminController");
const userController_1 = require("../Controller/userController");
const router = express_1.default.Router();
router.post("/login", validators_1.default, userController_1.loginController);
router.post("/new-user", userController_1.newUsercrete);
router.get("/view-job", adminController_1.viewJobsController);
router.get("view-jobById/:id", adminController_1.viewJobsByIdController);
router.get("/sort", userController_1.sortController);
router.get("/search", userController_1.serchController);
exports.default = router;
