import express from 'express'
import { jobListing, newApplication, newUsercrete, findJob ,getUserController , loginController} from '../Controller/userController'
import { query , validationResult , body } from 'express-validator'
import passport from '../config/passport'
const router = express.Router()

router.get('/getUser', passport.authenticate('jwt', {session : false}) , getUserController)
router.post('/login' , body("email").notEmpty(), body("password").notEmpty(),loginController)

//User routers
router.post("/job-application",passport.authenticate('jwt', {session : false}), newApplication)
router.post("/new-user", newUsercrete)

//serching routers
router.post("/find-job/:id", findJob)
router.get("/job-openings", jobListing)

//filter routers
router.get('opening',)
export default router; 