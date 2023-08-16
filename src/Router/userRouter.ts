import express from 'express'
import { jobListing, newApplication, newUsercrete, findJob ,getUserController , loginController} from '../Controller/userController'
import passport from '../config/passport'
const router = express.Router()

router.get('/getUser', passport.authenticate('jwt', {session : false}) , getUserController)
router.post('/login' , loginController)
//User routers
router.post("/job-application", newApplication)
router.post("/new-user", newUsercrete)

//serching routers
router.post("/find-job/:id", findJob)
router.get("/job-openings", jobListing)

//filter routers
router.get('opening',)
export default router; 