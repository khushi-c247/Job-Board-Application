import express from 'express'
import { addJobsController, updateJobsController, viewJobsController, viewJobsByIdController ,deleteJobsController,filterApplicants, allApplicants} from '../Controller/adminController'
const router = express.Router()

// Admin Routers
router.get("/view-job", viewJobsController)
router.get("view-jobById/:id", viewJobsByIdController)
router.post('/add-job', addJobsController)
router.patch('/update-job/:id', updateJobsController)
router.delete('/delete-job/:id', deleteJobsController)

//applicaints router
router.get('/get-applications', allApplicants)
router.get('/filter-applications/:id', filterApplicants)


export default router;