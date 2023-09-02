"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validators_1 = __importDefault(require("../Middleware/validators"));
const index_1 = require("../Controller/index");
const router = express_1.default.Router();
//Routes that anyone can access
router.post("/login", validators_1.default, index_1.loginController);
router.post("/new-user", index_1.newUsercrete);
// this rout is same as /serch
// router.get("/view-job", viewJobsController);
router.get("view-jobById/:id", index_1.viewJobsByIdController);
router.get("/sort", index_1.sortController);
router.get("/view-job", index_1.JobserchController);
exports.default = router;
