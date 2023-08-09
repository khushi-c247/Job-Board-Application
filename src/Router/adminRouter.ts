import express from 'express'
import {addJobsController  , updateJobsController , deleteJobsController } from '../Controller/adminController'
const router = express.Router()

// Admin Routers
router.post('/add-job', addJobsController )
router.patch('/update-job/:id',updateJobsController )
router.delete('/delete-job/:id',deleteJobsController )
// router.post("/job-application", newApplicstion())

export default router;