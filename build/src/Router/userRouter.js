"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controller/userController");
const validators_1 = __importDefault(require("../Middleware/validators"));
const auth_1 = __importDefault(require("../Middleware/auth"));
const constants_1 = require("../helper/constants");
const passport_1 = __importDefault(require("../config/passport"));
const router = express_1.default.Router();
router.post('/login', validators_1.default, userController_1.loginController);
//User routers
router.post("/job-application", passport_1.default.authenticate('jwt', { session: false }), (0, auth_1.default)(constants_1.normal), userController_1.newApplication);
router.post("/new-user", userController_1.newUsercrete);
//serching routers 
router.post("/find-job/:id", userController_1.findJob);
router.get("/job-openings", userController_1.jobListing);
//filter routers
router.get('opening');
exports.default = router;
