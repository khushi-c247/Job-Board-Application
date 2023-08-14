import express from 'express'
import {jobListing, newApplication , newUser} from '../Controller/userController'

const router = express.Router()

router.get("/job-listing", jobListing)
router.post("/job-application", newApplication)
router.post("/new-user",newUser)

export default router; 