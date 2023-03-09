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
    // 0 - Not taking place
    // 1 - Not yet taken
    // 2 - cleared
    // 3 - rejected
    aptitudeTest: {
        type: Number,
        required: true,
    },
    onlineTechnicalTest: {
        type: Number,
        required: true,
    },
    groupDiscussion: {
        type: Number,
        required: true,
    },
    technicalInterviews: {
        type: Number,
        required: true,
    },
    hrInterviews: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true
})

const Application = mongoose.model('Application', applicationSchema)

export default Application