import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listApplicants } from '../actions/applicationActions'

const ApplicantScreen = ({history, match}) => {
    const jobOpeningId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const recruiterLogin = useSelector(state => state.recruiterLogin)
    const {recruiterInfo} = recruiterLogin

    const applicantList = useSelector(state => state.applicantList)
    const {loading, error, applicants} = applicantList

    useEffect(() => { 
        if((userInfo && userInfo.isAdmin) || recruiterInfo)
            dispatch(listApplicants(jobOpeningId))
        else{
            history.push('/login') 
        }
    }, [dispatch, history, userInfo, recruiterInfo, jobOpeningId])

    return (
        <>
            <h1>Applicants</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>ROLL NUMBER</th>
                            <th>EMAIL</th>
                            <th>PHONE</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map(applicant => (
                            <tr key={applicant._id}>
                                <td>{applicant._id}</td>
                                <td>{applicant.user && applicant.user.name}</td>
                                <td>{applicant.user && applicant.user.rollNumber}</td>
                                <td>{applicant.user && applicant.user.email}</td>
                                <td>{applicant.user && applicant.user.phone}</td>
                                <td>
                                    <Link to={`/application/${applicant._id}`}>
                                        <i class="fa-solid fa-link"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ApplicantScreen
