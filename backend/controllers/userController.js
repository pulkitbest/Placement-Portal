import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import generateOTP from '../utils/otp.js'
import sendMail from '../utils/mail.js'

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public
// const authUser = asyncHandler(async (req, res) => {
//     const {email, password} = req.body
    
//     const user = await User.findOne({email})

//     if(user && (await user.matchPassword(password))){
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             collegeEmail: user.collegeEmail,
//             rollNumber: user.rollNumber,
//             phone: user.phone,
//             resume: user.resume,
//             cgpa: user.cgpa,
//             tenthPercentage: user.tenthPercentage,
//             twelfthPercentage: user.twelfthPercentage,
//             department: user.department,
//             programme: user.programme,
//             dateOfBirth: user.dateOfBirth,
//             isAdmin: user.isAdmin,
//             token: generateToken(user._id),
//         })
//     }else{
//         res.status(401)
//         throw new Error('Invalid email or password')
//     } 
// })

//@desc Auth user using otp and get token
//@route POST /api/users/login
//@access Public
const authUserWithOTP = asyncHandler(async(req, res) => {
    const {email, otp} = req.body
    
    const user = await User.findOne({email})

    if(user && (otp == user.otpForEmail)){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            collegeEmail: user.collegeEmail,
            rollNumber: user.rollNumber,
            phone: user.phone,
            resume: user.resume,
            cgpa: user.cgpa,
            tenthPercentage: user.tenthPercentage,
            twelfthPercentage: user.twelfthPercentage,
            department: user.department,
            programme: user.programme,
            lookingFor: user.lookingFor,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid OTP')
    } 
})

//@desc Generate otp before signing in
//@route POST /api/users/generateOTPForLogin
//@access Public
const generateOTPForLogin = asyncHandler(async (req, res) => {
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(404)
        throw new Error('User Not Found')
    }
        
    try {
        const generatedOTP = generateOTP()
        user.otpForEmail = generatedOTP
        await user.save()
        await sendMail({
            to: email,
            OTP: generatedOTP,
        })
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            collegeEmail: user.collegeEmail,
            rollNumber: user.rollNumber,
            phone: user.phone,
            resume: user.resume,
            cgpa: user.cgpa,
            tenthPercentage: user.tenthPercentage,
            twelfthPercentage: user.twelfthPercentage,
            department: user.department,
            programme: user.programme,
            lookingFor: user.lookingFor,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
        })
    } catch (error) {
        res.status(400)
        throw new Error('Unable to send OTP')
    }
})

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {
        name, 
        email, 
        collegeEmail, 
        rollNumber, 
        phone, 
        resume, 
        cgpa, 
        tenthPercentage, 
        twelfthPercentage, 
        department, 
        programme, 
        lookingFor,
        dateOfBirth
    } = req.body
    
    const userExists = await User.findOne({
        $or: [
            {email: email},
            {collegeEmail: collegeEmail},
            {rollNumber: rollNumber},
            {phone: phone}
        ]
    })

    if(userExists && userExists.verified){
        res.status(400)
        if(email === userExists.email) throw new Error('Email already in use')
        if(collegeEmail === userExists.collegeEmail) throw new Error('College Email already in use')
        if(rollNumber === userExists.rollNumber) throw new Error('Roll Number already in use')
        if(phone === userExists.phone) throw new Error('Phone Number already in use')
        throw new Error('User already exists')
    }

    const generatedOTPForEmail = generateOTP()
    const generatedOTPForCollegeEmail = generateOTP()
    const generatedOTPForPhone = generateOTP()

    if(userExists){
        userExists.name = name
        userExists.email = email
        userExists.collegeEmail = collegeEmail
        userExists.rollNumber = rollNumber
        userExists.phone = phone
        userExists.resume = resume
        userExists.cgpa = cgpa 
        userExists.tenthPercentage = tenthPercentage
        userExists.twelfthPercentage = twelfthPercentage
        userExists.department = department
        userExists.programme = programme
        userExists.lookingFor = lookingFor
        userExists.dateOfBirth = dateOfBirth
        userExists.otpForEmail = generatedOTPForEmail
        userExists.otpForCollegeEmail = generatedOTPForCollegeEmail
        userExists.otpForPhone = generatedOTPForPhone

        await userExists.save()

        try{
            await sendMail({
                to: email,
                OTP: generatedOTPForEmail,
            })
            await sendMail({
                to: collegeEmail,
                OTP: generatedOTPForCollegeEmail,
            })
            res.status(201).json({
                _id: userExists._id,
                name: userExists.name,
                email: userExists.email,
                collegeEmail: userExists.collegeEmail,
                rollNumber: userExists.rollNumber,
                phone: userExists.phone,
                resume: userExists.resume,
                cgpa: userExists.cgpa,
                tenthPercentage: userExists.tenthPercentage,
                twelfthPercentage: userExists.twelfthPercentage,
                department: userExists.department,
                programme: userExists.programme,
                lookingFor: userExists.lookingFor,
                dateOfBirth: userExists.dateOfBirth,
                isAdmin: userExists.isAdmin,
                verified: userExists.verified,
            })
        } catch(error){
            res.status(400)
            throw new Error('Unable to Sign Up')
        }
    }
    else{
        const user = await User.create({
            name, 
            email, 
            collegeEmail, 
            rollNumber, 
            phone,
            resume, 
            cgpa, 
            tenthPercentage, 
            twelfthPercentage, 
            department, 
            programme, 
            lookingFor,
            dateOfBirth,
            otpForEmail: generatedOTPForEmail,
            otpForCollegeEmail: generatedOTPForCollegeEmail,
            otpForPhone: generatedOTPForPhone,
        })
    
        if(!user){
            res.status(400)
            throw new Error('User not found')
        }
    
        try{
            await sendMail({
                to: email,
                OTP: generatedOTPForEmail,
            })
            await sendMail({
                to: collegeEmail,
                OTP: generatedOTPForCollegeEmail,
            })
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                collegeEmail: user.collegeEmail,
                rollNumber: user.rollNumber,
                phone: user.phone,
                resume: user.resume,
                cgpa: user.cgpa,
                tenthPercentage: user.tenthPercentage,
                twelfthPercentage: user.twelfthPercentage,
                department: user.department,
                programme: user.programme,
                lookingFor: user.lookingFor,
                dateOfBirth: user.dateOfBirth,
                isAdmin: user.isAdmin,
                verified: user.verified,
            })
        } catch(error){
            res.status(400)
            throw new Error('Unable to Sign Up')
        }
    }
})

//@desc Verify the newly registered user
//@route POST /api/users/verify
//@access Public
const verifyUserAll = asyncHandler(async(req, res) => {
    const {userId, otpForEmail, otpForCollegeEmail, otpForPhone} = req.body
    const user = await User.findById(userId)
    if(!user){
        res.status(404) 
        throw new Error('User Not Found')
    }
    if((!otpForEmail || (otpForEmail && otpForEmail === user.otpForEmail)) &&
        (!otpForCollegeEmail || (otpForCollegeEmail && otpForCollegeEmail === user.otpForCollegeEmail))) {
            try {
                user.verified = true
                await user.save()
                res.status(200).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    collegeEmail: user.collegeEmail,
                    rollNumber: user.rollNumber,
                    phone: user.phone,
                    resume: user.resume,
                    cgpa: user.cgpa,
                    tenthPercentage: user.tenthPercentage,
                    twelfthPercentage: user.twelfthPercentage,
                    department: user.department,
                    programme: user.programme,
                    lookingFor: user.lookingFor,
                    dateOfBirth: user.dateOfBirth,
                    isAdmin: user.isAdmin,
                    verified: user.verified,
                    token: generateToken(user._id),
                })
            } catch (error) {
                res.status(400)
                throw new Error('Could not verify user')
            }
    }
    else{
        res.status(400)
        throw new Error('Invalid OTP')
    }
})

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            collegeEmail: user.collegeEmail,
            rollNumber: user.rollNumber,
            phone: user.phone,
            resume: user.resume,
            cgpa: user.cgpa,
            tenthPercentage: user.tenthPercentage,
            twelfthPercentage: user.twelfthPercentage,
            department: user.department,
            programme: user.programme,
            lookingFor: user.lookingFor,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            verified: user.verified,
        })
    }
    else{
        res.status(404)
        throw new Error('User not Found!')
    }
})

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.collegeEmail = req.body.collegeEmail || user.collegeEmail
        user.rollNumber = req.body.rollNumber || user.rollNumber
        user.phone = req.body.phone || user.phone
        user.resume = req.body.resume || user.resume
        user.cgpa = req.body.cgpa || user.cgpa
        user.tenthPercentage = req.body.tenthPercentage || user.tenthPercentage
        user.twelfthPercentage = req.body.twelfthPercentage || user.twelfthPercentage
        user.department = req.body.department || user.department
        user.programme = req.body.programme || user.programme
        user.lookingFor = req.body.lookingFor || user.lookingFor
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth

        await user.save()

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            collegeEmail: user.collegeEmail,
            rollNumber: user.rollNumber,
            phone: user.phone,
            resume: user.resume,
            cgpa: user.cgpa,
            tenthPercentage: user.tenthPercentage,
            twelfthPercentage: user.twelfthPercentage,
            department: user.department,
            programme: user.programme,
            lookingFor: user.lookingFor,
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            verified: user.verified,
            token: generateToken(user._id),
        })

    }
    else{
        res.status(404)
        throw new Error('Use not Found!')
    }
})

//@desc Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//@desc Delete a user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        await user.remove()
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Get user by ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.json(user)
    } else{
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            collegeEmail: updatedUser.collegeEmail,
            rollNumber: updatedUser.rollNumber,
            phone: updatedUser.phone,
            resume: updatedUser.resume,
            cgpa: updatedUser.cgpa,
            tenthPercentage: updatedUser.tenthPercentage,
            twelfthPercentage: updatedUser.twelfthPercentage,
            department: updatedUser.department,
            programme: updatedUser.programme,
            lookingFor: updatedUser.lookingFor,
            dateOfBirth: updatedUser.dateOfBirth,
            isAdmin: updatedUser.isAdmin,
            verified: user.verified,
        })

    }
    else{
        res.status(404)
        throw new Error('Use not Found!')
    }
})

export { 
    authUserWithOTP,
    generateOTPForLogin,
    getUserProfile, 
    registerUser, 
    verifyUserAll,
    updateUserProfile,
    getUsers, 
    deleteUser, 
    getUserById, 
    updateUser,
}