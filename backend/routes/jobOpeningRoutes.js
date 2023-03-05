import express from 'express'
const router = express.Router()
import {
    getJobOpeningById,
    getJobOpenings,
    deleteJobOpening,
    updateJobOpening,
    createJobOpening,
    createJobOpeningReview,
    verifyJobOpening, 
    getMyJobOpenings
} from '../controllers/jobOpeningController.js'
import { protect, recruiterProtect, admin, recruiterAndAdmin } from '../middleware/authMiddleware.js'

router.route('/')
    .get(protect, getJobOpenings)
    .post(recruiterProtect, createJobOpening)

router.route('/myJobOpenings')
    .get(recruiterProtect, getMyJobOpenings)

router.route('/:id/verify').put(protect, admin, verifyJobOpening)

router.route('/:id')
    .get(protect, recruiterProtect, getJobOpeningById)
    .delete(recruiterProtect, protect, recruiterAndAdmin, deleteJobOpening)
    .put(recruiterProtect, updateJobOpening)

router.route('/:id/comments').post(protect, recruiterProtect, createJobOpeningReview)


export default router