import express from 'express'
import newApplication from '../Controller/userController'

const router = express.Router()

// router.get('/job-listing', userController)
router.post("/job-application", newApplication)

export default router; 