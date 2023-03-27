import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'
import { Error } from 'mongoose'
import Application from '../models/applicationModel.js'

//@desc Create new application
//@route POST /api/applications
//@access Private
const createApplication = asyncHandler(async(req, res) => {
    const jobOpening = mongoose.Types.ObjectId(req.body.jobOpening)
    const user = req.user._id

    if(!jobOpening){
        res.status(400)
        throw new Error('Nothing Selected to Register')
    }

    const application = new Application({
        user,
        jobOpening,
        aptitudeTest: req.body.aptitudeTest,
        onlineTechnicalTest: req.body.onlineTechnicalTest,
        groupDiscussion: req.body.groupDiscussion,
        technicalInterviews: req.body.technicalInterviews,
        hrInterviews: req.body.hrInterviews
    })

    const createdApplication = await application.save()
    res.status(201).json(createdApplication)
})

//@desc Get application by id
//@route GET /api/applications/:id
//@access Private
const getApplicationById = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id)
                                            .populate('user', 'name rollNumber email collegeEmail phone department programme cgpa tenthPercentage twelfthPercentage resume')
                                            .populate('jobOpening', 'recruiter nameOftheCompany typeOfJobOpening jobDesignation aptitudeTest onlineTechnicalTest groupDiscussion technicalInterviews hrInterviews')
    
    if(application){
        res.json(application)
    }else{
        res.status(404)
        throw new Error('Application not found')
    }
})

//@desc Get all applications
//@route GET /api/applications
//@access Private/Admin
const getApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({}).populate('user', 'id name')
    res.json(applications)
})

//@desc Get logged in user applications
//@route GET /api/applications/myapplications
//@access Private
const getMyApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({user: req.user._id}).populate('jobOpening', 'nameOftheCompany typeOfJobOpening jobDesignation')
    
    res.json(applications)
})

//@desc Get job opening's applicants
//@route GET /api/applications/jobOpening/:id
//@access Recruiter & Private/Admin
const getJobOpeningApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({jobOpening: req.params.id}).populate('jobOpening', 'id recruiter').populate('user', 'id name rollNumber email phone')
    const applicants = []
    applications.forEach((application) => {
        applicants.push({
            _id: application._id,
            jobOpeningId: application.jobOpening._id,
            userId: application.user._id,
            recruiterId: application.jobOpening.recruiter,
            userName: application.user.name,
            userRollNumber: application.user.rollNumber,
            userEmail: application.user.email,
            userPhone: application.user.phone,
            aptitudeTest: application.aptitudeTest,
            onlineTechnicalTest: application.onlineTechnicalTest,
            groupDiscussion: application.groupDiscussion,
            technicalInterviews: application.technicalInterviews,
            hrInterviews: application.hrInterviews
        })
    })
    res.json(applicants)
})

//@desc Update Application
//@route PUT /api/applications/:id
//@access Recruiter & Admin
const updateApplication = asyncHandler(async(req, res) => {
    const application = await Application.findById(req.params.id)
    if(application) {
        application.aptitudeTest = req.body.aptitudeTest
        application.onlineTechnicalTest = req.body.onlineTechnicalTest
        application.groupDiscussion = req.body.groupDiscussion
        application.technicalInterviews = req.body.technicalInterviews
        application.hrInterviews = req.body.hrInterviews
        const updatedApplication = await application.save()
        res.json(updatedApplication)
    } else {
        res.status(404)
        throw new Error('Application Not Found')
    }
})

export{
    createApplication,
    getApplicationById,
    getApplications,
    getMyApplications,
    getJobOpeningApplications,
    updateApplication,
}