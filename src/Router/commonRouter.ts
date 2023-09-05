import express from "express";
import {body, validationResult } from 'express-validator'
import {validateMiddleware,validateForggot } from "../Middleware/validators";
import {
  newUsercrete,
  loginController,
  sortController,
  JobserchController,
  viewJobsByIdController,
  forgotPassword,
  viewJobsController
} from "../Controller/index";
const router = express.Router();

//Routes that anyone can access
router.post("/login", validateMiddleware, loginController);
router.post("/new-user", newUsercrete);

// this rout is same as /search
router.get("/viewAll-job", viewJobsController);
router.get("/view-jobById/:id", viewJobsByIdController);
router.get("/sort", sortController);

router.get("/view-job", JobserchController);

//forgot password
router.post("/forgot-password",validateForggot,forgotPassword)
export default router;
