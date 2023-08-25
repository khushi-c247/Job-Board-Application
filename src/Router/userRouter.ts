import express from "express";
import {
  newApplication,
  updateUserController,
  GetmyJobs,
  loginController,
  deleteUserController
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
router.post("/login", validateMiddleware, loginController);
router.put("/update-user/:id", passport.authenticate("jwt", { session: false }),
authorization(normal),updateUserController);
router.delete('/delete/:id',  passport.authenticate("jwt", { session: false }),
authorization(normal),deleteUserController)

router.get("/getmyJob", passport.authenticate("jwt", { session: false }),
authorization(normal), GetmyJobs);

//Upload Resumes
router.post("/resume", uploadfile.array("resume"));

export default router;
