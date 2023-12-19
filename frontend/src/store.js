import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {
    userLoginReducer, 
    userRegisterReducer, 
    userVerificationReducer,
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
    userGenerateOTPReducer
} from './reducers/userReducers'
import {
    jobOpeningListReducer,
    jobOpeningDetailsReducer,
    jobOpeningCommentCreateReducer,
    jobOpeningListMyReducer,
    jobOpeningCreateReducer,
    jobOpeningDeleteReducer,
    jobOpeningUpdateReducer,
    jobOpeningVerifyReducer
} from './reducers/jobOpeningReducers'
import {
    recruiterLoginReducer,
    recruiterGenerateOTPReducer,
    recruiterRegisterReducer,
    recruiterVerificationReducer,
    recruiterDetailsReducer,
    recruiterUpdateProfileReducer,
    recruiterListReducer,
    recruiterDeleteReducer,
    recruiterVerifyAsAdminReducer
} from './reducers/recruiterReducers'
import { 
    applicationListMyReducer,
    applicationDetailsReducer,
    applicationCreateReducer,
    applicantListReducer,
    applicationUpdateReducer
} from './reducers/applicationReducers'

const reducer = combineReducers({
    jobOpeningList: jobOpeningListReducer,
    jobOpeningListMy: jobOpeningListMyReducer,
    jobOpeningDetails: jobOpeningDetailsReducer,
    jobOpeningCommentCreate: jobOpeningCommentCreateReducer,
    jobOpeningCreate: jobOpeningCreateReducer,
    jobOpeningDelete: jobOpeningDeleteReducer,
    jobOpeningUpdate: jobOpeningUpdateReducer,
    jobOpeningVerify: jobOpeningVerifyReducer,

    userLogin: userLoginReducer,
    userGenerateOTP: userGenerateOTPReducer,
    userRegister: userRegisterReducer,
    userVerification: userVerificationReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    recruiterLogin: recruiterLoginReducer,
    recruiterGenerateOTP: recruiterGenerateOTPReducer,
    recruiterRegister: recruiterRegisterReducer,
    recruiterVerification: recruiterVerificationReducer,
    recruiterDetails: recruiterDetailsReducer,
    recruiterUpdateProfile: recruiterUpdateProfileReducer,
    recruiterList: recruiterListReducer,
    recruiterDelete: recruiterDeleteReducer,
    recruiterVerifyAsAdmin: recruiterVerifyAsAdminReducer,

    applicationListMy: applicationListMyReducer,
    applicationDetails: applicationDetailsReducer,
    applicationCreate: applicationCreateReducer,
    applicantList: applicantListReducer,
    applicationUpdate: applicationUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
const recruiterInfoFromStorage = localStorage.getItem('recruiterInfo') ? JSON.parse(localStorage.getItem('recruiterInfo')):null

const initialState = {
    userLogin: {userInfo: userInfoFromStorage},
    recruiterLogin: {recruiterInfo: recruiterInfoFromStorage}
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store

