import mongoose from 'mongoose'

const applicationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    jobOpening: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'JobOpening'
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

}, {
    timestamps: true
})

const Application = mongoose.model('Application', applicationSchema)

export default Application