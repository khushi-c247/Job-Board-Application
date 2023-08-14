import express from 'express'
import { jobListing, newApplication, newUser, findJob } from '../Controller/userController'

const router = express.Router()

//User routers
router.post("/job-application", newApplication)
router.post("/new-user", newUser)

//serching routers
router.post("/find-job/:id", findJob)
router.get("/job-openings", jobListing)

//filter routers
router.get('opening',)
export default router; 