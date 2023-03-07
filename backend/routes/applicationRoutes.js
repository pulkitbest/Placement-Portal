import express from 'express'
const router = express.Router()

import {
    createApplication, 
    getApplicationById, 
    getApplications, 
    getJobOpeningApplications, 
    getMyApplications
} from '../controllers/applicationController.js'

import {protect, recruiterProtect, admin, recruiterAndAdmin} from '../middleware/authMiddleware.js'

router.route('/').post(protect, createApplication).get(protect, admin, getApplications)

router.route('/myapplications').get(protect, getMyApplications)

router.route('/:id').get(protect, recruiterProtect, getApplicationById)

router.route('/jobOpening/:id').get(protect, recruiterProtect, recruiterAndAdmin, getJobOpeningApplications)


export default router