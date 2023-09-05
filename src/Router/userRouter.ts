import express from "express";
import {
  newApplication,
  GetmyJobs,
  updateUserController,
  deleteUserController,
  JobserchController,
  viewJobsByIdController,
  sortController,
  resetPassword
} from "../Controller/index";
import authorization from "../Middleware/auth";
import uploadfile from "../helper/upload";
import bodyParser from "body-parser";
import { normal } from "../helper/constants";
import passport from "../config/loginPassport";
import {demopassport, emptyToken} from "../config/resetPassport";
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

//User routers (CRUD)
router.post(
  "/job-application",
  passport.authenticate("jwt", { session: false }),
  authorization(normal),
  newApplication
);
router.put(
  "/update-user",
  passport.authenticate("jwt", { session: false }),
  updateUserController
);
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteUserController
);

//Get your job by user id (include pagination)
router.get(
  "/getmyJob",
  passport.authenticate("jwt", { session: false }),
  authorization(normal),
  GetmyJobs
);

//view all job openings (include serching and pagination feature)
router.get("/view-job", JobserchController);
router.get("/view-jobById/:id", viewJobsByIdController);

//Sort job by any clm 
router.get("/sort", sortController);

//Upload Resumes
router.post("/resume", uploadfile.array("resume"));

// router.put('/reset', emptyToken,demopassport.authenticate("jwt", { session: false }), resetPassword)

router.put('/reset', emptyToken,demopassport.authenticate("jwt", { session: false }), resetPassword)



export default router;
