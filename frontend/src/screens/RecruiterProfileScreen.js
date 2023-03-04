import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getRecruiterDetails} from '../actions/recruiterActions'
import FormContainer from '../components/FormContainer'

const RecruiterProfileScreen = ({history}) => {
    const dispatch = useDispatch()

    const recruiterDetails = useSelector(state => state.recruiterDetails)
    const {loading, error, recruiter} = recruiterDetails

    const recruiterLogin = useSelector(state => state.recruiterLogin)
    const {recruiterInfo} = recruiterLogin

    useEffect(() => { 
        if(!recruiterInfo){
            history.push('/login')
        } else {
            if(!recruiter || !recruiter.name){
                dispatch(getRecruiterDetails('profile'))
            }
        }

    }, [dispatch, history, recruiterInfo, recruiter])

    return (
        <FormContainer>
            <h1 className='text-center'>Recruiter's Profile</h1>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Link to={'/recruiter/profile/update'}>
                        <Button variant='outline-dark' className='col-12'>
                        <i className='fa fa-cog' aria-hidden="true"></i> update
                        </Button>
                    </Link>
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Verified by Admin: {recruiter.verifiedByAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Name: {recruiter.name}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Email: {recruiter.email} {recruiter.verified ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Mobile Number: {recruiter.mobileNumber} {recruiter.verified ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Phone Number: {recruiter.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Company: {recruiter.nameOftheCompany}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Designation: {recruiter.designation}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Mode of Recruitment: {recruiter.modeOfRecruitment}
                </ListGroup.Item>
                <ListGroup.Item className='text-center py-3'>
                    Office Address: {recruiter.officeAddress}
                </ListGroup.Item>
            </ListGroup>
        </FormContainer>
    )
}

export default RecruiterProfileScreen
