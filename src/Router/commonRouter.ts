import express from "express";
import validateMiddleware from "../Middleware/validators";
import {
  newUsercrete,
  loginController,
  sortController,
  JobserchController,
  viewJobsByIdController,
  forgotPassword
} from "../Controller/index";
const router = express.Router();

//Routes that anyone can access
router.post("/login", validateMiddleware, loginController);
router.post("/new-user", newUsercrete);

// this rout is same as /serch
// router.get("/view-job", viewJobsController);
router.get("/view-jobById/:id", viewJobsByIdController);
router.get("/sort", sortController);

router.get("/view-job", JobserchController);

//forgot password
router.post("/forgot-password",forgotPassword)
export default router;
