import express from "express";
import {
  newApplication,
  updateUserController,
  GetmyJobs,
} from "../Controller/userController";
import validateMiddleware from "../Middleware/validators";
import authorization from "../Middleware/auth";
import uploadfile from "../helper/upload";
import bodyParser from "body-parser";
import { normal } from "../helper/constants";
import passport from "../config/passport";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//User routers
router.post(     
  "/job-application",
  passport.authenticate("jwt", { session: false }),
  authorization(normal),
  newApplication
);

router.put("/update-user/:id", passport.authenticate("jwt", { session: false }),
authorization(normal),updateUserController);

//serching routers
// router.post("/find-job/:id", findJob);
// router.get("/job-openings", jobListing);
router.get("/getmyJob", GetmyJobs);
//filter routers
//Upload Resumes
router.post("/resume", uploadfile.array("resume"));

export default router;
