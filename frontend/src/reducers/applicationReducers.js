import { 
    APPLICANT_LIST_FAIL,
    APPLICANT_LIST_REQUEST,
    APPLICANT_LIST_RESET,
    APPLICANT_LIST_SUCCESS,
    APPLICATION_CREATE_FAIL,
    APPLICATION_CREATE_REQUEST,
    APPLICATION_CREATE_RESET,
    APPLICATION_CREATE_SUCCESS,
    APPLICATION_DETAILS_FAIL,
    APPLICATION_DETAILS_REQUEST,
    APPLICATION_DETAILS_RESET,
    APPLICATION_DETAILS_SUCCESS,
    APPLICATION_LIST_MY_FAIL, 
    APPLICATION_LIST_MY_REQUEST, 
    APPLICATION_LIST_MY_RESET, 
    APPLICATION_LIST_MY_SUCCESS 
} from "../constants/applicationConstants"

export const applicationListMyReducer = (state = {applications: []}, action) => {
    switch(action.type){
        case APPLICATION_LIST_MY_REQUEST:
            return {
                loading: true
            }
        case APPLICATION_LIST_MY_SUCCESS:
            return{
                loading: false,
                applications: action.payload
            }
        case APPLICATION_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_LIST_MY_RESET:
            return {
                applications: []
            }
        default:
            return state
    }
}

export const applicantListReducer = (state = {applicants: []}, action) => {
    switch(action.type){
        case APPLICANT_LIST_REQUEST:
            return {
                loading: true
            }
        case APPLICANT_LIST_SUCCESS:
            return{
                loading: false,
                applicants: action.payload
            }
        case APPLICANT_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICANT_LIST_RESET:
            return {
                applicants: []
            }
        default:
            return state
    }
}

export const applicationDetailsReducer = (state = {}, action) => {
    switch(action.type){
        case APPLICATION_DETAILS_REQUEST:
            return {loading: true}
        case APPLICATION_DETAILS_SUCCESS:
            return {loading: false, application: action.payload}
        case APPLICATION_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        case APPLICATION_DETAILS_RESET:
            return { application: {} }
        default:
            return state
    }
}

export const applicationCreateReducer = (state = {}, action) => {
    switch(action.type){
        case APPLICATION_CREATE_REQUEST:
            return {
                loading: true
            }
        case APPLICATION_CREATE_SUCCESS:
            return{
                loading: false,
                success: true,
                application: action.payload
            }
        case APPLICATION_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case APPLICATION_CREATE_RESET:
            return {}
        default:
            return state
    }
}