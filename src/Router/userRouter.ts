import express from 'express'
import { jobListing, newApplication, newUsercrete, findJob , loginController} from '../Controller/userController'
import validateMiddleware from '../Middleware/validators'
import authorization from "../Middleware/auth"
import {normal} from "../helper/constants"
import passport from '../config/passport'
const router = express.Router()

router.post('/login' , validateMiddleware, loginController)

//User routers
router.post("/job-application",passport.authenticate('jwt', {session : false}), authorization(normal), newApplication)
router.post("/new-user", newUsercrete)

//serching routers 
router.post("/find-job/:id", findJob)
router.get("/job-openings", jobListing)

//filter routers
router.get('opening',)
export default router; 