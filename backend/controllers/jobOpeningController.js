import asyncHandler from 'express-async-handler'
import JobOpening from '../models/jobOpeningModel.js'

//@desc Fetch all jobOpenings
//@route GET /api/jobOpenings
//@access Student
const getJobOpenings = asyncHandler(async (req, res) => {
    const pageSize = 12
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        nameOftheCompany: new RegExp(req.query.keyword, 'i')
    } : {}

    const count = await JobOpening.countDocuments({ ...keyword})
    const jobOpenings = await JobOpening.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    res.json({jobOpenings, page, pages: Math.ceil(count / pageSize)})
})

//@desc Fetch single jobOpening
//@route GET /api/jobOpenings/:id
//@access Student
const getJobOpeningById = asyncHandler(async (req, res) => {
    const jobOpening = await JobOpening.findById(req.params.id).populate('recruiter', 'id name')

    if(jobOpening){
        res.json(jobOpening)
    } else{
        res.status(404)
        throw new Error('Job Opening not found')
    }
})

//@desc Get Logged in recruiter's jobOpening
//@route GET/api/jobOpenings/myJobOpenings
//@access Recruiter
const getMyJobOpenings = asyncHandler(async (req, res) => {
    const jobOpenings = await JobOpening.find({recruiter: req.recruiter._id})
    res.json(jobOpenings)
})

//@desc Delete a jobOpening
//@route DELETE /api/jobOpenings/:id
//@access Recruiter
const deleteJobOpening = asyncHandler(async (req, res) => {
    const jobOpening = await JobOpening.findById(req.params.id)

    if(jobOpening && jobOpening.recruiter.equals(req.recruiter._id)){
        await jobOpening.remove()
        res.json({message: 'Job Opening Removed'})
    } else{
        res.status(404)
        throw new Error('Job Opening not found')
    }
})

//@desc create a jobOpening
//@route POST /api/jobOpenings
//@access Recruiter
const createJobOpening = asyncHandler(async (req, res) => {
    const {
        nameOftheCompany,
        natureOfBusiness,
        typeOfJobOpening,
        jobDesignation,
        tentativeJoiningDate,
        tentativeJobLocation,
        jobDescription,
        minIntakeOfStudents,
        maxIntakeOfStudents,
        bTechIT,
        bTechITBI,
        bTechECE,
        mTechIT,
        mTechECE,
        mTechDSA,
        mTechBI,
        mba,
        bTechCTC,
        bTechBasePay,
        bTechStocks,
        bTechStockOptions,
        bTechDetailedBreakDown,
        mTechCTC,
        mTechBasePay,
        mTechStocks,
        mTechStockOptions,
        mTechDetailedBreakDown,
        relocationBenefits,
        serviceBond,
        medicalRequirements,
        tenthPercentage,
        twelfthPercentage,
        cgpa,
        aptitudeTest,
        onlineTechnicalTest,
        groupDiscussion,
        technicalInterviews,
        hrInterviews,
        image,
        formDeadline,
    } = req.body

    const jobOpening = await JobOpening.create({
        recruiter: req.recruiter._id,
        nameOftheCompany,
        natureOfBusiness,
        typeOfJobOpening,
        jobDesignation,
        tentativeJoiningDate,
        tentativeJobLocation,
        jobDescription,
        minIntakeOfStudents,
        maxIntakeOfStudents,
        bTechIT,
        bTechITBI,
        bTechECE,
        mTechIT,
        mTechECE,
        mTechDSA,
        mTechBI,
        mba,
        bTechCTC,
        bTechBasePay,
        bTechStocks,
        bTechStockOptions,
        bTechDetailedBreakDown,
        mTechCTC,
        mTechBasePay,
        mTechStocks,
        mTechStockOptions,
        mTechDetailedBreakDown,
        relocationBenefits,
        serviceBond,
        medicalRequirements,
        tenthPercentage,
        twelfthPercentage,
        cgpa,
        aptitudeTest,
        onlineTechnicalTest,
        groupDiscussion,
        technicalInterviews,
        hrInterviews,
        image,
        formDeadline
    })

    const createdJobOpening = await jobOpening.save()
    res.status(200).json(createdJobOpening)
})

//@desc update a jobOpening
//@route PUT /api/jobOpenings/:id
//@access Recruiter
const updateJobOpening = asyncHandler(async (req, res) => {
    const jobOpening = await JobOpening.findById(req.params.id)

    if(jobOpening && jobOpening.recruiter.equals(req.recruiter._id)){
        jobOpening.nameOftheCompany = req.body.nameOftheCompany || jobOpening.nameOftheCompany
        jobOpening.natureOfBusiness = req.body.natureOfBusiness || jobOpening.natureOfBusiness
        jobOpening.typeOfJobOpening = req.body.typeOfJobOpening || jobOpening.typeOfJobOpening
        jobOpening.jobDesignation = req.body.jobDesignation || jobOpening.jobDesignation
        jobOpening.tentativeJoiningDate = req.body.tentativeJoiningDate || jobOpening.tentativeJoiningDate
        jobOpening.tentativeJobLocation = req.body.tentativeJobLocation || jobOpening.tentativeJobLocation
        jobOpening.jobDescription = req.body.jobDescription || jobOpening.jobDescription
        jobOpening.minIntakeOfStudents = req.body.minIntakeOfStudents || jobOpening.minIntakeOfStudents
        jobOpening.maxIntakeOfStudents = req.body.maxIntakeOfStudents || jobOpening.maxIntakeOfStudents
        jobOpening.bTechIT = req.body.bTechIT || jobOpening.bTechIT
        jobOpening.bTechITBI = req.body.bTechITBI || jobOpening.bTechITBI
        jobOpening.bTechECE = req.body.bTechECE || jobOpening.bTechECE
        jobOpening.mTechIT = req.body.mTechIT || jobOpening.mTechIT
        jobOpening.mTechECE = req.body.mTechECE || jobOpening.mTechECE
        jobOpening.mTechDSA = req.body.mTechDSA || jobOpening.mTechDSA
        jobOpening.mTechBI = req.body.mTechBI || jobOpening.mTechBI
        jobOpening.mba = req.body.mba || jobOpening.mba
        jobOpening.bTechCTC = req.body.bTechCTC || jobOpening.bTechCTC
        jobOpening.bTechBasePay = req.body.bTechBasePay || jobOpening.bTechBasePay
        jobOpening.bTechStocks = req.body.bTechStocks || jobOpening.bTechStocks
        jobOpening.bTechStockOptions = req.body.bTechStockOptions || jobOpening.bTechStockOptions
        jobOpening.bTechDetailedBreakDown = req.body.bTechDetailedBreakDown || jobOpening.bTechDetailedBreakDown
        jobOpening.mTechCTC = req.body.mTechCTC || jobOpening.mTechCTC 
        jobOpening.mTechBasePay = req.body.mTechBasePay || jobOpening.mTechBasePay
        jobOpening.mTechStocks = req.body.mTechStocks || jobOpening.mTechStocks
        jobOpening.mTechStockOptions = req.body.mTechStockOptions || jobOpening.mTechStockOptions
        jobOpening.mTechDetailedBreakDown = req.body.mTechDetailedBreakDown || jobOpening.mTechDetailedBreakDown
        jobOpening.relocationBenefits = req.body.relocationBenefits || jobOpening.relocationBenefits
        jobOpening.serviceBond = req.body.serviceBond || jobOpening.serviceBond
        jobOpening.medicalRequirements = req.body.medicalRequirements || jobOpening.medicalRequirements
        jobOpening.tenthPercentage = req.body.tenthPercentage || jobOpening.tenthPercentage
        jobOpening.twelfthPercentage = req.body.twelfthPercentage || jobOpening.twelfthPercentage
        jobOpening.cgpa = req.body.cgpa || jobOpening.cgpa
        jobOpening.aptitudeTest = req.body.aptitudeTest || jobOpening.aptitudeTest
        jobOpening.onlineTechnicalTest = req.body.onlineTechnicalTest || jobOpening.onlineTechnicalTest
        jobOpening.groupDiscussion = req.body.groupDiscussion || jobOpening.groupDiscussion
        jobOpening.technicalInterviews = req.body.technicalInterviews || jobOpening.technicalInterviews 
        jobOpening.hrInterviews = req.body.hrInterviews || jobOpening.hrInterviews
        jobOpening.image = req.body.image || jobOpening.image
        jobOpening.formDeadline = req.body.formDeadline || jobOpening.formDeadline
        const updatedJobOpening = await jobOpening.save()
        res.json(updatedJobOpening)
    } else {
        res.status(404)
        throw new Error('Job Opening Not Found')
    }
})

//@desc create new comment
//@route POST /api/jobOpenings/:id/comments
//@access Public
const createJobOpeningReview = asyncHandler(async (req, res) => {
    const {description} = req.body
    const jobOpening = await JobOpening.findById(req.params.id)

    const name = req.user ? req.user.name : req.recruiter.name

    if(jobOpening){
        const review = {
            name: name,
            description: description
        }

        jobOpening.comments.push(review)

        await jobOpening.save()
        res.status(201).json({message: 'Comment Added'})
    } else {
        res.status(404)
        throw new Error('Job Opening Not Found')
    }
})

//@desc verify the job opening as admin
//@route PUT /api/jobOpenings/:id/verify
//@access Admin
const verifyJobOpening = asyncHandler(async(req, res) => {
    const jobOpening = await JobOpening.findById(req.params.id)

    if(jobOpening){
        jobOpening.verifiedByAdmin = true
        const updatedJobOpening = await jobOpening.save()
        res.status(200).json(updatedJobOpening)
    } else {
        res.status(404)
        throw new Error('Job Opening not found')
    }
})

export {
    getJobOpeningById,
    getJobOpenings,
    getMyJobOpenings,
    deleteJobOpening,
    updateJobOpening,
    createJobOpening,
    createJobOpeningReview,
    verifyJobOpening
}