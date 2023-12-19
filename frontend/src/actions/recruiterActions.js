import axios from 'axios'
import { JOB_OPENING_LIST_MY_RESET } from '../constants/jobOpeningConstants'
import { RECRUITER_DELETE_FAIL, RECRUITER_DELETE_REQUEST, RECRUITER_DELETE_SUCCESS, RECRUITER_DETAILS_FAIL, RECRUITER_DETAILS_REQUEST, RECRUITER_DETAILS_RESET, RECRUITER_DETAILS_SUCCESS, RECRUITER_GENERATE_OTP_FAIL, RECRUITER_GENERATE_OTP_REQUEST, RECRUITER_GENERATE_OTP_RESET, RECRUITER_GENERATE_OTP_SUCCESS, RECRUITER_LIST_FAIL, RECRUITER_LIST_REQUEST, RECRUITER_LIST_SUCCESS, RECRUITER_LOGIN_FAIL, RECRUITER_LOGIN_REQUEST, RECRUITER_LOGIN_SUCCESS, RECRUITER_LOGOUT, RECRUITER_REGISTER_FAIL, RECRUITER_REGISTER_REQUEST, RECRUITER_REGISTER_SUCCESS, RECRUITER_UPDATE_PROFILE_FAIL, RECRUITER_UPDATE_PROFILE_REQUEST, RECRUITER_UPDATE_PROFILE_SUCCESS, RECRUITER_VERIFICATION_FAIL, RECRUITER_VERIFICATION_REQUEST, RECRUITER_VERIFICATION_SUCCESS, RECRUITER_VERIFY_AS_ADMIN_FAIL, RECRUITER_VERIFY_AS_ADMIN_REQUEST, RECRUITER_VERIFY_AS_ADMIN_SUCCESS } from '../constants/recruiterConstants'

export const login = (email, otp) => async(dispatch) => {
    try{
        dispatch({
            type: RECRUITER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        const {data} = await axios.post('/api/recruiters/login', {email, otp}, config)
    
        dispatch({
            type: RECRUITER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('recruiterInfo', JSON.stringify(data))
    } catch (error){
        dispatch({
            type: RECRUITER_LOGIN_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const generateOTP = (email) => async(dispatch) => {
    try{
        dispatch({
            type: RECRUITER_GENERATE_OTP_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/recruiters/generateOTPForLogin', {email}, config)

        dispatch({
            type: RECRUITER_GENERATE_OTP_SUCCESS,
        })
    } catch(error){
        dispatch({
            type: RECRUITER_GENERATE_OTP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const recruiterLogout = () => async (dispatch) => {
    localStorage.removeItem('recruiterInfo')
    dispatch({
        type: RECRUITER_LOGOUT
    })
    dispatch({
        type: RECRUITER_GENERATE_OTP_RESET
    })
    dispatch({
        type: RECRUITER_DETAILS_RESET
    })
    dispatch({
        type: JOB_OPENING_LIST_MY_RESET
    })
}

export const register = (
    name, 
    email, 
    mobileNumber, 
    phoneNumber, 
    nameOftheCompany, 
    designation, 
    officeAddress, 
    modeOfRecruitment
    ) => async (dispatch) => {
    try{
        dispatch({
            type: RECRUITER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
        const {data} = await axios.post('/api/recruiters', {
            name, 
            email, 
            mobileNumber, 
            phoneNumber, 
            nameOftheCompany, 
            designation, 
            officeAddress, 
            modeOfRecruitment
        }, config)
    
        dispatch({
            type: RECRUITER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error){
        dispatch({
            type: RECRUITER_REGISTER_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const verify = (recruiterId, otpForEmail, otpForMobileNumber) => async(dispatch) => {
    try {
        dispatch({
            type: RECRUITER_VERIFICATION_REQUEST
        })


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(`/api/recruiters/verify`, {recruiterId, otpForEmail, otpForMobileNumber}, config)
        
        dispatch({
            type: RECRUITER_VERIFICATION_SUCCESS,
            payload: data
        })

        dispatch({
            type: RECRUITER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('recruiterInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: RECRUITER_VERIFICATION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getRecruiterDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: RECRUITER_DETAILS_REQUEST
        })

        const {recruiterLogin: {recruiterInfo}} = getState()
        const {userLogin: {userInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${recruiterInfo ? recruiterInfo.token : userInfo.token}`
            }
        }
 
        const {data} = await axios.get(`/api/recruiters/${id}`, config)
    
        dispatch({
            type: RECRUITER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: RECRUITER_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateRecruiterProfile = (recruiter) => async (dispatch, getState) => {
    try{
        dispatch({
            type: RECRUITER_UPDATE_PROFILE_REQUEST
        })

        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${recruiterInfo.token}`
            }
        }
 
        const {data} = await axios.put(`/api/recruiters/profile`, recruiter, config)
    
        dispatch({
            type: RECRUITER_UPDATE_PROFILE_SUCCESS,
        })
        
        dispatch({
            type: RECRUITER_LOGIN_SUCCESS,
            payload: data,
        })

        localStorage.setItem('recruiterInfo', JSON.stringify(data))
    } catch (error){
        dispatch({
            type: RECRUITER_UPDATE_PROFILE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listRecruiters = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: RECRUITER_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
 
        const {data} = await axios.get(`/api/recruiters`, config)
    
        dispatch({
            type: RECRUITER_LIST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: RECRUITER_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteRecruiter = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: RECRUITER_DELETE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
 
        await axios.delete(`/api/recruiters/${id}`, config)
    
        dispatch({
            type: RECRUITER_DELETE_SUCCESS
        })
    } catch (error){
        dispatch({
            type: RECRUITER_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const verifyRecruiterAsAdmin = (recruiter) => async (dispatch, getState) => {
    try{
        dispatch({
            type: RECRUITER_VERIFY_AS_ADMIN_REQUEST
        })

        const {userLogin: {userInfo}} = getState()
        console.log('jello')
        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log('h1llo')
        const {data} = await axios.put(`/api/recruiters/${recruiter._id}`, recruiter, config)
        console.log('hello')
        dispatch({
            type: RECRUITER_VERIFY_AS_ADMIN_SUCCESS
        })

        dispatch({
            type: RECRUITER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: RECRUITER_VERIFY_AS_ADMIN_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}