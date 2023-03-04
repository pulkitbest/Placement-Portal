import { RECRUITER_DELETE_FAIL, RECRUITER_DELETE_REQUEST, RECRUITER_DELETE_SUCCESS, RECRUITER_DETAILS_FAIL, RECRUITER_DETAILS_REQUEST, RECRUITER_DETAILS_RESET, RECRUITER_DETAILS_SUCCESS, RECRUITER_GENERATE_OTP_FAIL, RECRUITER_GENERATE_OTP_REQUEST, RECRUITER_GENERATE_OTP_RESET, RECRUITER_GENERATE_OTP_SUCCESS, RECRUITER_LIST_FAIL, RECRUITER_LIST_REQUEST, RECRUITER_LIST_RESET, RECRUITER_LIST_SUCCESS, RECRUITER_LOGIN_FAIL, RECRUITER_LOGIN_REQUEST, RECRUITER_LOGIN_SUCCESS, RECRUITER_LOGOUT, RECRUITER_REGISTER_FAIL, RECRUITER_REGISTER_REQUEST, RECRUITER_REGISTER_SUCCESS, RECRUITER_UPDATE_PROFILE_FAIL, RECRUITER_UPDATE_PROFILE_REQUEST, RECRUITER_UPDATE_PROFILE_RESET, RECRUITER_UPDATE_PROFILE_SUCCESS, RECRUITER_VERIFICATION_FAIL, RECRUITER_VERIFICATION_REQUEST, RECRUITER_VERIFICATION_SUCCESS, RECRUITER_VERIFY_AS_ADMIN_FAIL, RECRUITER_VERIFY_AS_ADMIN_REQUEST, RECRUITER_VERIFY_AS_ADMIN_RESET, RECRUITER_VERIFY_AS_ADMIN_SUCCESS } from '../constants/recruiterConstants'

export const recruiterLoginReducer = (state = {}, action) => {
    switch(action.type){
        case RECRUITER_LOGIN_REQUEST:
            return {loading: true}
        case RECRUITER_LOGIN_SUCCESS:
            return {loading: false, recruiterInfo: action.payload}
        case RECRUITER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case RECRUITER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const recruiterGenerateOTPReducer = (state = {}, action) => {
    switch(action.type){
        case RECRUITER_GENERATE_OTP_REQUEST:
            return {loading: true}
        case RECRUITER_GENERATE_OTP_SUCCESS:
            return {loading: false, success: true}
        case RECRUITER_GENERATE_OTP_FAIL:
            return {loading: false, error: action.payload}
        case RECRUITER_GENERATE_OTP_RESET:
            return {}
        default:
            return state
    }
}

export const recruiterRegisterReducer = (state = {}, action) => {
    switch(action.type){
        case RECRUITER_REGISTER_REQUEST:
            return {loading: true}
        case RECRUITER_REGISTER_SUCCESS:
            return {loading: false, recruiterInfo: action.payload}
        case RECRUITER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const recruiterVerificationReducer = (state = {}, action) => {
    switch(action.type){
        case RECRUITER_VERIFICATION_REQUEST:
            return {loading: true}
        case RECRUITER_VERIFICATION_SUCCESS:
            return {loading: false, success: true}
        case RECRUITER_VERIFICATION_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const recruiterDetailsReducer = (state = {recruiter: {}}, action) => {
    switch(action.type){
        case RECRUITER_DETAILS_REQUEST:
            return {...state, loading: true}
        case RECRUITER_DETAILS_SUCCESS:
            return {loading: false, recruiter: action.payload}
        case RECRUITER_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        case RECRUITER_DETAILS_RESET:
            return { recruiter: {} }
        default:
            return state
    }
}

export const recruiterUpdateProfileReducer = (state = {}, action) => {
    switch(action.type){
        case RECRUITER_UPDATE_PROFILE_REQUEST:
            return {loading: true}
        case RECRUITER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true, recruiter: action.payload}
        case RECRUITER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}
        case RECRUITER_UPDATE_PROFILE_RESET:
            return {}
        default:
            return state
    }
}

export const recruiterListReducer = (state = {recruiters: []}, action) => {
    switch(action.type){
        case RECRUITER_LIST_REQUEST:
            return {loading: true}
        case RECRUITER_LIST_SUCCESS:
            return {loading: false, recruiters: action.payload}
        case RECRUITER_LIST_FAIL:
            return {loading: false, error: action.payload}
        case RECRUITER_LIST_RESET:
            return {recruiters: []}
        default:
            return state
    }
}

export const recruiterDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case RECRUITER_DELETE_REQUEST:
            return {loading: true}
        case RECRUITER_DELETE_SUCCESS:
            return {loading: false, success: true}
        case RECRUITER_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const recruiterVerifyAsAdminReducer = (state = {recruiter: {}}, action) => {
    switch(action.type){
        case RECRUITER_VERIFY_AS_ADMIN_REQUEST:
            return {loading: true}
        case RECRUITER_VERIFY_AS_ADMIN_SUCCESS:
            return {loading: false, success: true}
        case RECRUITER_VERIFY_AS_ADMIN_FAIL:
            return {loading: false, error: action.payload}
        case RECRUITER_VERIFY_AS_ADMIN_RESET:
            return {recruiter: {}}
        default:
            return state
    }
}
