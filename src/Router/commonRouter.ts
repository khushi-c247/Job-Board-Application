import express from "express";
import validateMiddleware from "../Middleware/validators";
import {
  viewJobsByIdController,
  viewJobsController,
} from "../Controller/adminController";
import {
  newUsercrete,
  sortController,
  serchController,
  loginController,
} from "../Controller/userController";
const router = express.Router();
router.post("/login", validateMiddleware, loginController);
router.post("/new-user", newUsercrete);
router.get("/view-job", viewJobsController);
router.get("view-jobById/:id", viewJobsByIdController);
router.get("/sort", sortController);
router.get("/search", serchController);

export default router;
