import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    collegeEmail: {
        type: String,
        required: true,
        unique: true
    },
    rollNumber: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    resume: {
        type: String,
        required: true,
    },
    cgpa: {
        type: Number,
        required: true,
    },
    tenthPercentage: {
        type: Number,
        required: true,
    },
    twelfthPercentage: {
        type: Number,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    programme: {
        type: String,
        required: true
    },
    lookingFor: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otpForEmail: {
        type: String,
        required: true
    },
    otpForCollegeEmail: {
        type: String,
        required: true
    },
    otpForPhone: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// //encrypt password before creating new user
// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })



const User = mongoose.model('User', userSchema)

export default User