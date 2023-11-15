import express from 'express'
const router = express.Router()
import { getAllJobs, getJob, createJob, updateJob, deleteJob, showStats } from '../controllers/jobControllers.js'


router.route('/').post(createJob).get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').patch(updateJob).delete(deleteJob).get(getJob)

export default router;