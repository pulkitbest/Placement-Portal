import axios from 'axios'
import { APPLICANT_LIST_FAIL, APPLICANT_LIST_REQUEST, APPLICANT_LIST_SUCCESS, APPLICATION_CREATE_FAIL, APPLICATION_CREATE_REQUEST, APPLICATION_CREATE_SUCCESS, APPLICATION_DETAILS_FAIL, APPLICATION_DETAILS_REQUEST, APPLICATION_DETAILS_SUCCESS, APPLICATION_LIST_MY_FAIL, APPLICATION_LIST_MY_REQUEST, APPLICATION_LIST_MY_SUCCESS, APPLICATION_UPDATE_FAIL, APPLICATION_UPDATE_REQUEST, APPLICATION_UPDATE_SUCCESS } from '../constants/applicationConstants'

export const listMyApplications = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: APPLICATION_LIST_MY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/applications/myapplications`, config)
        
        dispatch({
            type: APPLICATION_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: APPLICATION_LIST_MY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listApplicants = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: APPLICANT_LIST_REQUEST
        })

        const {userLogin: {userInfo}} = getState()
        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo ? userInfo.token : recruiterInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/applications/jobOpening/${id}`, config)
        
        dispatch({
            type: APPLICANT_LIST_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: APPLICANT_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const getApplicationDetails = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: APPLICATION_DETAILS_REQUEST
        })

        const {userLogin: {userInfo}} = getState()
        const {recruiterLogin: {recruiterInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo ? userInfo.token : recruiterInfo.token}`
            }
        }
 
        const {data} = await axios.get(`/api/applications/${id}`, config)
    
        dispatch({
            type: APPLICATION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: APPLICATION_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createApplication = (application) => async (dispatch, getState) => {
    try{
        dispatch({
            type: APPLICATION_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
 
        const {data} = await axios.post(`/api/applications`, application, config)
    
        dispatch({
            type: APPLICATION_CREATE_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: APPLICATION_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateApplication = (application) => async (dispatch, getState) => {
    try{
        dispatch({
            type: APPLICATION_UPDATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState()
        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${recruiterInfo ? recruiterInfo.token : userInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/applications/${application._id}`, application, config)
        
        dispatch({
            type: APPLICATION_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error){ 
        dispatch({
            type: APPLICATION_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}