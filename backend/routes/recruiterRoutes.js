import express from 'express'
const router = express.Router()
import { 
    authRecruiterWithOTP, 
    deleteRecruiter, 
    generateOTPForLogin, 
    getRecruiterById, 
    getRecruiterProfile, 
    getRecruiters, 
    registerRecruiter, 
    updateRecruiterProfile, 
    verifyRecruiterAll, 
    verifyRecruiterAsAdmin 
} from '../controllers/recruiterController.js'
import { recruiterProtect, protect, admin, recruiterAndAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerRecruiter).get(protect, admin, getRecruiters)

router.route('/verify').post(verifyRecruiterAll)

router.post('/login', authRecruiterWithOTP)

router.post('/generateOTPForLogin', generateOTPForLogin)

router.route('/profile').get(recruiterProtect, getRecruiterProfile).put(recruiterProtect, updateRecruiterProfile)

router.route('/:id').delete(protect, admin, deleteRecruiter).get(protect, recruiterProtect, recruiterAndAdmin, getRecruiterById).put(protect, admin, verifyRecruiterAsAdmin)

export default router