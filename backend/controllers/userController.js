import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc Auth user and get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    
    const user = await User.findOne({email})

    if(user && (await user.matchPassword(password))){
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
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password')
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
        password, 
        resume, 
        cgpa, 
        tenthPercentage, 
        twelfthPercentage, 
        department, 
        programme, 
        dateOfBirth
    } = req.body
    
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name, 
        email, 
        collegeEmail, 
        rollNumber, 
        phone, 
        password, 
        resume, 
        cgpa, 
        tenthPercentage, 
        twelfthPercentage, 
        department, 
        programme, 
        dateOfBirth
    })

    if(user){
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
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else{
        res.status(400)
        throw new Error('User not found')
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
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error('Use not Found!')
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
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

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
            dateOfBirth: user.dateOfBirth,
            isAdmin: user.isAdmin,
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
    const user = await User.findById(req.params.id).select('-password')
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
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            collegeEmail: updateUser.collegeEmail,
            rollNumber: updateUser.rollNumber,
            phone: updateUser.phone,
            resume: updateUser.resume,
            cgpa: updateUser.cgpa,
            tenthPercentage: updateUser.tenthPercentage,
            twelfthPercentage: updateUser.twelfthPercentage,
            department: updateUser.department,
            programme: updateUser.programme,
            dateOfBirth: updateUser.dateOfBirth,
            isAdmin: updateUser.isAdmin,
        })

    }
    else{
        res.status(404)
        throw new Error('Use not Found!')
    }
})

export {authUser, 
    getUserProfile, 
    registerUser, 
    updateUserProfile,
    getUsers, 
    deleteUser, 
    getUserById, 
    updateUser}