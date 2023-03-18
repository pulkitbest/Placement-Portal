import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const jobOpeningSchema = mongoose.Schema({
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Recruiter',
    },
    nameOftheCompany: {
        type: String,
        required: true,
    },
    natureOfBusiness: {
        type: String,
        required: true,
    },
    typeOfJobOpening: {
        type: String,
        required: true,
    },
    jobDesignation: {
        type: String,
        required: true,
    },
    tentativeJoiningDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tentativeJobLocation: {
        type: String,
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    minIntakeOfStudents: {
        type: Number,
        required: true,
    },
    maxIntakeOfStudents: {
        type: Number,
        required: true,
    },
    bTechIT: {
        type: Boolean,
        required: true,
        default: false,
    },
    bTechITBI: {
        type: Boolean,
        required: true,
        default: false,
    },
    bTechECE: {
        type: Boolean,
        required: true,
        default: false,
    },
    mTechIT: {
        type: Boolean,
        required: true,
        default: false,
    },
    mTechECE: {
        type: Boolean,
        required: true,
        default: false,
    },
    mTechDSA: {
        type: Boolean,
        required: true,
        default: false,
    },
    mTechBI: {
        type: Boolean,
        required: true,
        default: false,
    },
    mba: {
        type: Boolean,
        required: true,
        default: false,
    },
    bTechCTC: {
        type: String,
        required: true,
    },
    bTechBasePay: {
        type: String,
        required: true,
    },
    bTechStocks: {
        type: String,
        required: true,
    },
    bTechStockOptions: {
        type: String,
        required: true,
    },
    bTechDetailedBreakDown: {
        type: String,
        required: true,
    },
    mTechCTC: {
        type: String,
        required: true,
    },
    mTechBasePay: {
        type: String,
        required: true,
    },
    mTechStocks: {
        type: String,
        required: true,
    },
    mTechStockOptions: {
        type: String,
        required: true,
    },
    mTechDetailedBreakDown: {
        type: String,
        required: true,
    },
    relocationBenefits: {
        type: String,
        default: 'NA',
    },
    serviceBond: {
        type: String,
        default: 'NA',
    },
    medicalRequirements: {
        type: String,
        default: 'NA',
    },
    tenthPercentage: {
        type: Number,
        required: true,
        default: 0,
    },
    twelfthPercentage: {
        type: Number,
        required: true,
        default: 0,
    },
    cgpa: {
        type: Number,
        required: true,
        default: 0,
    },
    aptitudeTest: {
        type: Boolean,
        required: true,
        default: false,
    },
    onlineTechnicalTest: {
        type: Boolean,
        required: true,
        default: false,
    },
    groupDiscussion: {
        type: Boolean,
        required: true,
        default: false,
    },
    technicalInterviews: {
        type: Boolean,
        required: true,
        default: false,
    },
    hrInterviews: {
        type: Boolean,
        required: true,
        default: false,
    },
    verifiedByAdmin: {
        type: Boolean,
        default: false,
    },
    formDeadline: {
        type: Date,
        required: true,
        default: Date.now()
    },
    comments: [commentSchema],
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
})

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema)

export default JobOpening