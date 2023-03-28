import { JOB_OPENING_CREATE_COMMENT_FAIL, JOB_OPENING_CREATE_COMMENT_REQUEST, JOB_OPENING_CREATE_COMMENT_RESET, JOB_OPENING_CREATE_COMMENT_SUCCESS, JOB_OPENING_CREATE_FAIL, JOB_OPENING_CREATE_REQUEST, JOB_OPENING_CREATE_RESET, JOB_OPENING_CREATE_SUCCESS, JOB_OPENING_DELETE_FAIL, JOB_OPENING_DELETE_REQUEST, JOB_OPENING_DELETE_SUCCESS, JOB_OPENING_DETAILS_FAIL, JOB_OPENING_DETAILS_REQUEST, JOB_OPENING_DETAILS_SUCCESS, JOB_OPENING_LIST_FAIL, JOB_OPENING_LIST_MY_FAIL, JOB_OPENING_LIST_MY_REQUEST, JOB_OPENING_LIST_MY_RESET, JOB_OPENING_LIST_MY_SUCCESS, JOB_OPENING_LIST_REQUEST, JOB_OPENING_LIST_SUCCESS, JOB_OPENING_UPDATE_FAIL, JOB_OPENING_UPDATE_REQUEST, JOB_OPENING_UPDATE_RESET, JOB_OPENING_UPDATE_SUCCESS, JOB_OPENING_VERIFY_FAIL, JOB_OPENING_VERIFY_REQUEST, JOB_OPENING_VERIFY_RESET, JOB_OPENING_VERIFY_SUCCESS } from '../constants/jobOpeningConstants'

export const jobOpeningListReducer = (state = {jobOpenings: []}, action) => {
    switch(action.type){
        case JOB_OPENING_LIST_REQUEST:
            return {loading: true, jobOpenings: []}
        case JOB_OPENING_LIST_SUCCESS:
            return {
                loading: false, 
                jobOpenings: action.payload.jobOpenings, 
                pages: action.payload.pages, 
                page: action.payload.page
            }
        case JOB_OPENING_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const jobOpeningListMyReducer = (state = {jobOpenings: []}, action) => {
    switch(action.type){
        case JOB_OPENING_LIST_MY_REQUEST:
            return {
                loading: true
            }
        case JOB_OPENING_LIST_MY_SUCCESS:
            return{
                loading: false,
                jobOpenings: action.payload
            }
        case JOB_OPENING_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_OPENING_LIST_MY_RESET:
            return {
                jobOpenings: []
            }
        default:
            return state
    }
}

export const jobOpeningDetailsReducer = (state = {jobOpening: { comments: [] }}, action) => {
    switch(action.type){
        case JOB_OPENING_DETAILS_REQUEST:
            return {loading: true, ...state}
        case JOB_OPENING_DETAILS_SUCCESS:
            return {loading: false, jobOpening: action.payload}
        case JOB_OPENING_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const jobOpeningDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case JOB_OPENING_DELETE_REQUEST:
            return {loading: true}
        case JOB_OPENING_DELETE_SUCCESS:
            return {loading: false, success: true}
        case JOB_OPENING_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const jobOpeningCreateReducer = (state = {}, action) => {
    switch(action.type){
        case JOB_OPENING_CREATE_REQUEST:
            return {loading: true}
        case JOB_OPENING_CREATE_SUCCESS:
            return {loading: false, jobOpening: action.payload, success: true}
        case JOB_OPENING_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case JOB_OPENING_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const jobOpeningUpdateReducer = (state = {jobOpening: {}}, action) => {
    switch(action.type){
        case JOB_OPENING_UPDATE_REQUEST:
            return {loading: true}
        case JOB_OPENING_UPDATE_SUCCESS:
            return {loading: false, jobOpening: action.payload, success: true}
        case JOB_OPENING_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case JOB_OPENING_UPDATE_RESET:
            return {jobOpening: {}}
        default:
            return state
    }
}

export const jobOpeningCommentCreateReducer = (state = {}, action) => {
    switch(action.type){
        case JOB_OPENING_CREATE_COMMENT_REQUEST:
            return {loading: true}
        case JOB_OPENING_CREATE_COMMENT_SUCCESS:
            return {loading: false, success: true}
        case JOB_OPENING_CREATE_COMMENT_FAIL:
            return {loading: false, error: action.payload}
        case JOB_OPENING_CREATE_COMMENT_RESET:
            return {}
        default:
            return state
    }
}

export const jobOpeningVerifyReducer = (state = {}, action) => {
    switch(action.type){
        case JOB_OPENING_VERIFY_REQUEST:
            return { loading: true }
        case JOB_OPENING_VERIFY_SUCCESS:
            return { loading: false, success: true }
        case JOB_OPENING_VERIFY_FAIL:
            return { loading: false, error: action.payload }
        case JOB_OPENING_VERIFY_RESET:
            return {}
        default:
            return state
    }
}