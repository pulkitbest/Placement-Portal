import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getRecruiterDetails, verifyRecruiterAsAdmin} from '../actions/recruiterActions'
import { RECRUITER_VERIFY_AS_ADMIN_RESET } from '../constants/recruiterConstants'

const RecruiterEditScreen = ({match, history}) => {
    const recruiterId  = match.params.id
    const [verifiedByAdmin, setVerifiedByAdmin] = useState(false)

    const dispatch = useDispatch()

    const recruiterDetails = useSelector(state => state.recruiterDetails)
    const {loading, error, recruiter} = recruiterDetails

    const recruiterVerifyAsAdmin = useSelector(state => state.recruiterVerifyAsAdmin)
    const {loading:loadingVerify, error:errorVerify, success:successVerify} = recruiterVerifyAsAdmin

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        if(successVerify){
            dispatch({type: RECRUITER_VERIFY_AS_ADMIN_RESET})
        } else{
            if(!recruiter || !recruiter.name || recruiter._id !== recruiterId){
                dispatch(getRecruiterDetails(recruiterId))
            } else {
                setVerifiedByAdmin(recruiter.verifiedByAdmin)
            }
        }
    }, [recruiter, userInfo, dispatch, history, recruiterId, successVerify])

    const submitHandler = (e) => { 
        dispatch(verifyRecruiterAsAdmin({
            _id: recruiterId,
            verifiedByAdmin
        }))
    }

    return (
        <>
            <FormContainer>
                <h1>Recruiter Details</h1>
                {loadingVerify && <Loader/>}
                {errorVerify && <Message variant='danger'>{errorVerify}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <p className='fw-bold fs-3' display='inline-block'>{recruiter.name}, {recruiter.nameOftheCompany}</p>
                        <p className='fw-bold' display='inline-block'>Email: <a href={`mailto:${recruiter.email}`}>{recruiter.email}</a></p>
                        <p className='fw-bold' display='inline-block'>Mobile Number: {recruiter.mobileNumber}</p>
                        <p className='fw-bold' display='inline-block'>Phone Number: {recruiter.phoneNumber}</p>
                        <p className='fw-bold' display='inline-block'>Designation: {recruiter.designation}</p>
                        <p className='fw-bold' display='inline-block'>Mode of Recruitment: {recruiter.modeOfRecruitment}</p>
                        <p className='fw-bold' display='inline-block'>Office Address: {recruiter.officeAddress}</p>
                        
                        <Form.Group controlId='verfiedByAdmin'>
                            <Form.Check 
                                type='checkbox' 
                                label='Verify' 
                                checked={verifiedByAdmin}
                                onChange={(e) => setVerifiedByAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <h2> </h2>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default RecruiterEditScreen
