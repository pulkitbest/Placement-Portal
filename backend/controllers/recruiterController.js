import asyncHandler from 'express-async-handler'
import Recruiter from '../models/recruiterModel.js'
import generateToken from '../utils/generateToken.js'
import generateOTP from '../utils/otp.js'
import sendMail from '../utils/mail.js'

//@desc Auth recruiter using otp and get token
//@route POST /api/recruiters/login
//@access Public
const authRecruiterWithOTP = asyncHandler(async(req, res) => {
    const {email, otp} = req.body
    
    const recruiter = await Recruiter.findOne({email})

    if(recruiter && (otp == recruiter.otpForEmail)){
        res.json({
            _id: recruiter._id,
            name: recruiter.name,
            email: recruiter.email,
            mobileNumber: recruiter.mobileNumber,
            phoneNumber: recruiter.phoneNumber,
            nameOftheCompany: recruiter.nameOftheCompany,
            designation: recruiter.designation,
            officeAddress: recruiter.officeAddress,
            modeOfRecruitment: recruiter.modeOfRecruitment,
            verifiedByAdmin: recruiter.verifiedByAdmin,
            token: generateToken(recruiter._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid OTP')
    } 
})

//@desc Generate otp before signing in
//@route POST /api/recruiters/generateOTPForLogin
//@access Public
const generateOTPForLogin = asyncHandler(async (req, res) => {
    const {email} = req.body

    const recruiter = await Recruiter.findOne({email})

    if(!recruiter){
        res.status(404)
        throw new Error('User Not Found')
    }
        
    try {
        const generatedOTP = generateOTP()
        recruiter.otpForEmail = generatedOTP
        await recruiter.save()
        await sendMail({
            to: email,
            OTP: generatedOTP,
        })
        res.status(200).json({
            _id: recruiter._id,
            name: recruiter.name,
            email: recruiter.email,
            mobileNumber: recruiter.mobileNumber,
            phoneNumber: recruiter.phoneNumber,
            nameOftheCompany: recruiter.nameOftheCompany,
            designation: recruiter.designation,
            officeAddress: recruiter.officeAddress,
            modeOfRecruitment: recruiter.modeOfRecruitment,
        })
    } catch (error) {
        res.status(400)
        throw new Error('Unable to send OTP')
    }
})

//@desc Register a new recruiter
//@route POST /api/recruiters
//@access Public
const registerRecruiter = asyncHandler(async (req, res) => {
    const {
        name, 
        email, 
        mobileNumber, 
        phoneNumber, 
        nameOftheCompany, 
        designation, 
        officeAddress, 
        modeOfRecruitment, 
    } = req.body
    
    const recruiterExists = await Recruiter.findOne({email})

    if(recruiterExists){
        res.status(400)
        throw new Error('Account with this email already exists')
    }

    const generatedOTPForEmail = generateOTP()
    const generatedOTPForMobileNumber = generateOTP()

    const recruiter = await Recruiter.create({
        name, 
        email, 
        mobileNumber, 
        phoneNumber, 
        nameOftheCompany, 
        designation, 
        officeAddress, 
        modeOfRecruitment, 
        otpForEmail: generatedOTPForEmail,
        otpForMobileNumber: generatedOTPForMobileNumber,
    })

    if(!recruiter){
        res.status(400)
        throw new Error('Recruiter not found')
    }

    try{
        await sendMail({
            to: email,
            OTP: generatedOTPForEmail,
        })
        res.status(201).json({
            _id: recruiter._id,
            name: recruiter.name,
            email: recruiter.email,
            mobileNumber: recruiter.mobileNumber,
            phoneNumber: recruiter.phoneNumber,
            nameOftheCompany: recruiter.nameOftheCompany,
            designation: recruiter.designation,
            officeAddress: recruiter.officeAddress,
            modeOfRecruitment: recruiter.modeOfRecruitment
        })
    } catch(error){
        res.status(400)
        throw new Error('Unable to Sign Up')
    }
})

//@desc Verify the newly registered recruiter
//@route POST /api/recruiters/verify
//@access Public
const verifyRecruiterAll = asyncHandler(async(req, res) => {
    const {recruiterId, otpForEmail, otpForMobileNumber} = req.body
    const recruiter = await Recruiter.findById(recruiterId)
    if(!recruiter){
        res.status(404) 
        throw new Error('User Not Found')
    }
    if(!otpForEmail || (otpForEmail && otpForEmail === recruiter.otpForEmail)) {
            try {
                recruiter.verified = true
                await recruiter.save()
                res.status(200).json({
                    _id: recruiter._id,
                    name: recruiter.name,
                    email: recruiter.email,
                    mobileNumber: recruiter.mobileNumber,
                    phoneNumber: recruiter.phoneNumber,
                    nameOftheCompany: recruiter.nameOftheCompany,
                    designation: recruiter.designation,
                    officeAddress: recruiter.officeAddress,
                    modeOfRecruitment: recruiter.modeOfRecruitment,
                    verified: recruiter.verified,
                    token: generateToken(recruiter._id),
                })
            } catch (error) {
                res.status(400)
                throw new Error('Could not verify recruiter')
            }
    }
    else{
        res.status(400)
        throw new Error('Invalid OTP')
    }
})

//@desc Get recruiter profile
//@route GET /api/recruiters/profile
//@access Private
const getRecruiterProfile = asyncHandler(async (req, res) => {
    const recruiter = await Recruiter.findById(req.recruiter._id)

    if(recruiter){
        res.json({
            _id: recruiter._id,
            name: recruiter.name,
            email: recruiter.email,
            mobileNumber: recruiter.mobileNumber,
            phoneNumber: recruiter.phoneNumber,
            nameOftheCompany: recruiter.nameOftheCompany,
            designation: recruiter.designation,
            officeAddress: recruiter.officeAddress,
            modeOfRecruitment: recruiter.modeOfRecruitment,
            verified: recruiter.verified,
            verifiedByAdmin: recruiter.verifiedByAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error('Recruiter not Found!')  
    }
})

//@desc Update recruiter profile
//@route PUT /api/recruiters/profile
//@access Private
const updateRecruiterProfile = asyncHandler(async (req, res) => {
    const recruiter = await Recruiter.findById(req.recruiter._id)

    if(recruiter){
        recruiter.name = req.body.name || recruiter.name
        recruiter.email = req.body.email || recruiter.email
        recruiter.mobileNumber = req.body.mobileNumber || recruiter.mobileNumber
        recruiter.phoneNumber = req.body.phoneNumber || recruiter.phoneNumber
        recruiter.nameOftheCompany = req.body.nameOftheCompany || recruiter.nameOftheCompany
        recruiter.designation = req.body.designation || recruiter.designation
        recruiter.officeAddress = req.body.officeAddress || recruiter.officeAddress
        recruiter.modeOfRecruitment = req.body.modeOfRecruitment || recruiter.modeOfRecruitment

        await recruiter.save()

        res.json({
            _id: recruiter._id,
            name: recruiter.name,
            email: recruiter.email,
            mobileNumber: recruiter.mobileNumber,
            phoneNumber: recruiter.phoneNumber,
            nameOftheCompany: recruiter.nameOftheCompany,
            designation: recruiter.designation,
            officeAddress: recruiter.officeAddress,
            modeOfRecruitment: recruiter.modeOfRecruitment,
            verified: recruiter.verified,
            verifiedByAdmin: recruiter.verifiedByAdmin,
            token: generateToken(recruiter._id),
        })

    }
    else{
        res.status(404)
        throw new Error('Recruiter not Found!')
    }
})

//@desc Get all recruiters
//@route GET /api/recruiters
//@access Private/Admin
const getRecruiters = asyncHandler(async (req, res) => {
    const recruiters = await Recruiter.find({})
    res.json(recruiters)
})

//@desc Delete a recruiter
//@route DELETE /api/recruiters/:id
//@access Private/Admin
const deleteRecruiter = asyncHandler(async (req, res) => {
    const recruiter = await Recruiter.findById(req.params.id)
    if(recruiter) {
        await recruiter.remove()
        res.json({message: 'Recruiter removed'})
    } else {
        res.status(404)
        throw new Error('Recruiter not found')
    }
})

//@desc Get recruiter by ID
//@route GET /api/recruiters/:id
//@access Private/Admin
const getRecruiterById = asyncHandler(async (req, res) => {
    const recruiter = await Recruiter.findById(req.params.id)
    if(recruiter){
        res.json(recruiter)
    } else{
        res.status(404)
        throw new Error('Recruiter not found')
    }
})

//@desc Update recruiter
//@route PUT /api/recruiters/:id
//@access Private/Admin
const verifyRecruiterAsAdmin = asyncHandler(async (req, res) => {
    const recruiter = await Recruiter.findById(req.params.id)

    if(recruiter){
        recruiter.verifiedByAdmin = req.body.verifiedByAdmin

        const updatedRecruiter = await recruiter.save()

        res.json({
            _id: updatedRecruiter._id,
            name: updatedRecruiter.name,
            email: updatedRecruiter.email,
            mobileNumber: updatedRecruiter.mobileNumber,
            phoneNumber: updatedRecruiter.phoneNumber,
            nameOftheCompany: updatedRecruiter.nameOftheCompany,
            designation: updatedRecruiter.designation,
            officeAddress: updatedRecruiter.officeAddress,
            modeOfRecruitment: updatedRecruiter.modeOfRecruitment,
            verified: updatedRecruiter.verified,
            verifiedByAdmin: updatedRecruiter.verifiedByAdmin,
        })

    }
    else{
        res.status(404)
        throw new Error('Recruiter not Found!')
    }
})

export {
    registerRecruiter,
    verifyRecruiterAll,
    authRecruiterWithOTP,
    generateOTPForLogin,
    getRecruiterProfile,
    updateRecruiterProfile,
    getRecruiters,
    deleteRecruiter,
    getRecruiterById,
    verifyRecruiterAsAdmin,
}