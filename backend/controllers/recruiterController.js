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

    if(recruiter && (otp == recruiter.otpForMobileNumber)){
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
        recruiter.otpForMobileNumber = generatedOTP
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
        // await sendMail({
        //     to: email,
        //     OTP: generatedOTP,
        // })
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
    if((!otpForEmail || (otpForEmail && otpForEmail === recruiter.otpForEmail)) &&
        (!otpForMobileNumber || (otpForMobileNumber && otpForMobileNumber === recruiter.otpForMobileNumber))) {
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

export {
    registerRecruiter,
    verifyRecruiterAll,
    authRecruiterWithOTP,
    generateOTPForLogin,
}