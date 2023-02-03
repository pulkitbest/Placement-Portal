import express from 'express'
const router = express.Router()
import { authRecruiterWithOTP, generateOTPForLogin, registerRecruiter, verifyRecruiterAll } from '../controllers/recruiterController.js'
import { } from '../middleware/authMiddleware.js'

router.route('/').post(registerRecruiter)

router.route('/verify').post(verifyRecruiterAll)

router.post('/login', authRecruiterWithOTP)

router.post('/generateOTPForLogin', generateOTPForLogin)

export default router