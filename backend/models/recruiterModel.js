import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const recruiterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    nameOftheCompany: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
        required: true,
    },
    modeOfRecruitment: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otpForEmail: {
        type: String,
        required: true
    },
    otpForMobileNumber: {
        type: String,
        required: true
    },
    verifiedByAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

// companySchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }

// //encrypt password before creating new company
// companySchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

const Recruiter = mongoose.model('Recruiter', recruiterSchema)

export default Recruiter