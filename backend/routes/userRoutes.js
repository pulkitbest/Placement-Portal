import express from 'express'
const router = express.Router()
import { getUserProfile, 
        registerUser, 
        updateUserProfile, 
        getUsers, 
        deleteUser,
        getUserById,
        updateUser,
        verifyUserAll,
        authUserWithOTP,
        generateOTPForLogin} from '../controllers/userController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)

router.route('/verify').post(verifyUserAll)

router.post('/login', authUserWithOTP)

router.post('/generateOTPForLogin', generateOTPForLogin)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
                        
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser)

export default router