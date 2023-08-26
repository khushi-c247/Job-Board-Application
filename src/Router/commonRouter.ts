import express from "express";
import validateMiddleware from "../Middleware/validators";
import {
  newUsercrete,
  loginController,
  sortController,
  serchController,
  viewJobsByIdController,
} from "../Controller/index";
const router = express.Router();
router.post("/login", validateMiddleware, loginController);
router.post("/new-user", newUsercrete);
//TODO:same as /serch
// router.get("/view-job", viewJobsController);
router.get("view-jobById/:id", viewJobsByIdController);
router.get("/sort", sortController);

router.get("/view-job", serchController);

export default router;
