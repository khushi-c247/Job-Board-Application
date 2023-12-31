import express from "express";
import {
  addJobsController,
  updateJobsController,
  deleteJobsController,
  // getUserController,
  filterApplicants,
  allApplicants,
} from "../Controller/index";
import authorization from "../Middleware/auth";
import passport from "../config/passport";
import { admin } from "../helper/constants";

const router = express.Router();

// Admin Routers
router.post(
  "/add-job",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  addJobsController
);
router.patch(
  "/update-job/:id",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  updateJobsController
);
router.delete(
  "/delete-job/:id",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  deleteJobsController
);

// get user through email
// router.get(
//   "/getUser",
//   passport.authenticate("jwt", { session: false }),
//   authorization(admin),
//   getUserController
// );

//TODO:Impliment serch functionality
// Applicaints router

// Get applicaints
router.get(
  "/get-applications",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  allApplicants
);

//can filter out applicaints through "name", "experience", "discription" , "appliedTo"
router.get(
  "/filter-applications",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  filterApplicants
);

export default router;
