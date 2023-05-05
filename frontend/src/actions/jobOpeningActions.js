import axios from 'axios'
import { JOB_OPENING_CREATE_COMMENT_FAIL, JOB_OPENING_CREATE_COMMENT_REQUEST, JOB_OPENING_CREATE_COMMENT_SUCCESS, JOB_OPENING_CREATE_FAIL, JOB_OPENING_CREATE_REQUEST, JOB_OPENING_CREATE_SUCCESS, JOB_OPENING_DELETE_FAIL, JOB_OPENING_DELETE_REQUEST, JOB_OPENING_DELETE_SUCCESS, JOB_OPENING_DETAILS_FAIL, JOB_OPENING_DETAILS_REQUEST, JOB_OPENING_DETAILS_SUCCESS, JOB_OPENING_LIST_FAIL, JOB_OPENING_LIST_MY_FAIL, JOB_OPENING_LIST_MY_REQUEST, JOB_OPENING_LIST_MY_SUCCESS, JOB_OPENING_LIST_REQUEST, JOB_OPENING_LIST_SUCCESS, JOB_OPENING_UPDATE_FAIL, JOB_OPENING_UPDATE_REQUEST, JOB_OPENING_UPDATE_SUCCESS, JOB_OPENING_VERIFY_FAIL, JOB_OPENING_VERIFY_REQUEST, JOB_OPENING_VERIFY_SUCCESS } from '../constants/jobOpeningConstants'

export const listJobOpenings = (keyword = '', pageNumber = '') => async(dispatch, getState) => {
    try{
        dispatch({type: JOB_OPENING_LIST_REQUEST})   

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.get(`/api/jobOpenings?keyword=${keyword}&pageNumber=${pageNumber}`, config)

        dispatch({
            type: JOB_OPENING_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: JOB_OPENING_LIST_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listMyJobOpenings = () => async(dispatch, getState) => {
    try{
        dispatch({
            type: JOB_OPENING_LIST_MY_REQUEST
        })

        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                Authorization: `Bearer ${recruiterInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/jobOpenings/myJobOpenings`, config)
        
        dispatch({
            type: JOB_OPENING_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: JOB_OPENING_LIST_MY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listJobOpeningDetails = (id) => async(dispatch, getState) => {
    try{
        dispatch({type: JOB_OPENING_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()
        const {recruiterLogin: {recruiterInfo}} = getState()

        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo ? userInfo.token : recruiterInfo.token}`,
            }
        }

        const {data} = await axios.get(`/api/jobOpenings/${id}`, config)

        dispatch({
            type: JOB_OPENING_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: JOB_OPENING_DETAILS_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteJobOpening = (id) => async (dispatch, getState) => {
    try{
        dispatch({
            type: JOB_OPENING_DELETE_REQUEST
        })

        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                Authorization: `Bearer ${recruiterInfo.token}`,
            }
        }
        await axios.delete(`/api/jobOpenings/${id}`, config)
        
        dispatch({
            type: JOB_OPENING_DELETE_SUCCESS
        })
    } catch (error){ 
        dispatch({
            type: JOB_OPENING_DELETE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createJobOpening = (
    nameOftheCompany,
    natureOfBusiness,
    typeOfJobOpening,
    jobDesignation,
    tentativeJoiningDate,
    tentativeJobLocation,
    jobDescription,
    minIntakeOfStudents,
    maxIntakeOfStudents,
    bTechIT,
    bTechITBI,
    bTechECE,
    mTechIT,
    mTechECE,
    mTechDSA,
    mTechBI,
    mba,
    bTechCTC,
    bTechBasePay,
    bTechStocks,
    bTechStockOptions,
    bTechDetailedBreakDown,
    mTechCTC,
    mTechBasePay,
    mTechStocks,
    mTechStockOptions,
    mTechDetailedBreakDown,
    relocationBenefits,
    serviceBond,
    medicalRequirements,
    tenthPercentage,
    twelfthPercentage,
    cgpa,
    aptitudeTest,
    onlineTechnicalTest,
    groupDiscussion,
    technicalInterviews,
    hrInterviews,
    image,
    formDeadline
) => async (dispatch, getState) => {
    try{
        dispatch({
            type: JOB_OPENING_CREATE_REQUEST
        })

        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                Authorization: `Bearer ${recruiterInfo.token}`,
            }
        }
        const {data} = await axios.post(`/api/jobOpenings`, {
            nameOftheCompany,
            natureOfBusiness,
            typeOfJobOpening,
            jobDesignation,
            tentativeJoiningDate,
            tentativeJobLocation,
            jobDescription,
            minIntakeOfStudents,
            maxIntakeOfStudents,
            bTechIT,
            bTechITBI,
            bTechECE,
            mTechIT,
            mTechECE,
            mTechDSA,
            mTechBI,
            mba,
            bTechCTC,
            bTechBasePay,
            bTechStocks,
            bTechStockOptions,
            bTechDetailedBreakDown,
            mTechCTC,
            mTechBasePay,
            mTechStocks,
            mTechStockOptions,
            mTechDetailedBreakDown,
            relocationBenefits,
            serviceBond,
            medicalRequirements,
            tenthPercentage,
            twelfthPercentage,
            cgpa,
            aptitudeTest,
            onlineTechnicalTest,
            groupDiscussion,
            technicalInterviews,
            hrInterviews,
            image,
            formDeadline
        }, config)
        
        dispatch({
            type: JOB_OPENING_CREATE_SUCCESS,
            payload: data
        })
    } catch (error){ 
        dispatch({
            type: JOB_OPENING_CREATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateJobOpening = (jobOpening) => async (dispatch, getState) => {
    try{
        dispatch({
            type: JOB_OPENING_UPDATE_REQUEST
        })

        const {recruiterLogin: {recruiterInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${recruiterInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/jobOpenings/${jobOpening._id}`, jobOpening, config)
        
        dispatch({
            type: JOB_OPENING_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error){ 
        dispatch({
            type: JOB_OPENING_UPDATE_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createJobOpeningComment = (jobOpeningId, comment) => async (dispatch, getState) => {
    try{
        dispatch({
            type: JOB_OPENING_CREATE_COMMENT_REQUEST
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
        await axios.post(`/api/jobOpenings/${jobOpeningId}/comments`, comment, config)
        
        dispatch({
            type: JOB_OPENING_CREATE_COMMENT_SUCCESS
        })
    } catch (error){ 
        dispatch({
            type: JOB_OPENING_CREATE_COMMENT_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
} 

export const verifyJobOpening = (jobOpeningId) => async(dispatch, getState) => {
    try{
        dispatch({
            type: JOB_OPENING_VERIFY_REQUEST
        })

        const {userLogin: {userInfo}} = getState()

        //have to use this whenever there is a use of headers in this case header authorization
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/jobOpenings/${jobOpeningId}/verify`, {}, config)
        
        dispatch({
            type: JOB_OPENING_VERIFY_SUCCESS,
            payload: data
        })
    } catch (error){ 
        dispatch({
            type: JOB_OPENING_VERIFY_FAIL, 
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}