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
    })

    const createdApplication = await application.save()
    res.status(201).json(createdApplication)
})

//@desc Get application by id
//@route GET /api/applications/:id
//@access Private
const getApplicationById = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id).populate('user', 'name email')
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
    const applications = await Application.find({user: req.user._id})
    res.json(applications)
})

//@desc Get job opening's applicants
//@route GET /api/applications/jobOpening/:id
//@access Recruiter & Private/Admin
const getJobOpeningApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find({jobOpening: req.params.id}).populate('jobOpening', 'id recruiter')
    res.json(applications)
})

export{
    createApplication,
    getApplicationById,
    getApplications,
    getMyApplications,
    getJobOpeningApplications
}