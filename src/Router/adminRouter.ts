import express from "express";
import {
  addJobsController,
  updateJobsController,
  viewJobsController,
  getUserController,
  deleteJobsController,
  filterApplicants,
} from "../Controller/adminController";
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
router.get(
  "/getUser",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  getUserController
);

// Applicaints router
// router.get('/get-applications',  passport.authenticate('jwt', { session: false }), authorization(admin), viewJobsController, allApplicants)
router.get(
  "/filter-applications/:id",
  passport.authenticate("jwt", { session: false }),
  authorization(admin),
  filterApplicants
);

export default router;
