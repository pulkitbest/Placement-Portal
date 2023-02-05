import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
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
    },
    tentativeJobLocation: {
        type: [String],
        required: true,
    },
    jobDescription: {
        type: String,
        required: true,
    },
    intakeOfStudents: {
        minValue: {
            type: Number,
            required: true,
        },
        maxValue: {
            type: Number,
            required: true,
        }
    },
    eligibleStudents: {
        type: [String],
        required: true,
    },
    compensationDetails: {
        bTech: {
            ctc: {
                type: String,
                required: true,
            },
            basePay: {
                type: String,
                required: true,
            },
            stocks: {
                type: String,
                default: 'NA',
            },
            stockOptions: {
                type: String,
                default: 'NA',
            },
            detailedBreakDown: {
                type: String,
                default: 'NA',
            }
        },
        mTech: {
            ctc: {
                type: String,
                required: true,
            },
            basePay: {
                type: String,
                required: true,
            },
            stocks: {
                type: String,
                default: 'NA',
            },
            stockOptions: {
                type: String,
                default: 'NA',
            },
            detailedBreakDown: {
                type: String,
                default: 'NA',
            }
        }
    },
    relocationBenefits: {
        type: String,
        required: true,
        default: '',
    },
    serviceBond: {
        type: String,
        required: true,
        default: '',
    },
    medicalRequirements: {
        type: String,
        required: true,
        default: '',
    },
    minimumCg: {
        tenthPercentage: {
            type: Number,
            required: true,
            default: 0,
        },
        twelthPercentage: {
            type: Number,
            required: true,
            default: 0,
        },
        cgpa: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    rounds: {
        aptitudeTest: {
            yesOrNo: {
                type: Boolean,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            numberOfRounds: {
                type: Number,
                required: true,
            }
        },
        onlineTechnicalTest: {
            yesOrNo: {
                type: Boolean,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            numberOfRounds: {
                type: Number,
                required: true,
            }
        },
        groupDiscussion: {
            yesOrNo: {
                type: Boolean,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            numberOfRounds: {
                type: Number,
                required: true,
            }
        },
        technicalInterviews: {
            yesOrNo: {
                type: Boolean,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            numberOfRounds: {
                type: Number,
                required: true,
            }
        },
        hrInterviews: {
            yesOrNo: {
                type: Boolean,
                required: true,
            },
            duration: {
                type: String,
                required: true,
            },
            numberOfRounds: {
                type: Number,
                required: true,
            }
        },
    },
    registeredStudents: [String],
    comments: [commentSchema],

}, {
    timestamps: true
})

const JobOpening = mongoose.model('JobOpening', jobOpeningSchema)

export default JobOpening