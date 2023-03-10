import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
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
        if((userInfo && userInfo.isAdmin) || recruiterInfo){
            dispatch(listApplicants(jobOpeningId))
        }
        else{
            history.push('/login') 
        }
    }, [dispatch, history, userInfo, recruiterInfo, jobOpeningId])

    const exportHandler = () => {
        const rows = [
            [
                'Application ID',
                'User ID',
                'Name',
                'Roll Number',
                'Email',
                'Phone',
                'Aptitude Test',
                'Online Technical Test',
                'Group Discussion',
                'Technical Interviews',
                'HR Interviews'
            ], 
            ...applicants.map(applicant => [
                applicant._id,
                applicant.user._id,
                applicant.user.name,
                applicant.user.rollNumber,
                applicant.user.email,
                applicant.user.phone,
                applicant.aptitudeTest === 0 ? 'Cancel' : applicant.aptitudeTest === 1 ? 'Pending Results' : applicant.aptitudeTest === 2 ? 'Pass' : 'Fail',
                applicant.onlineTechnicalTest === 0 ? 'Cancel' : applicant.onlineTechnicalTest === 1 ? 'Pending Results' : applicant.onlineTechnicalTest === 2 ? 'Pass' : 'Fail',
                applicant.groupDiscussion === 0 ? 'Cancel' : applicant.groupDiscussion === 1 ? 'Pending Results' : applicant.groupDiscussion === 2 ? 'Pass' : 'Fail',
                applicant.technicalInterviews === 0 ? 'Cancel' : applicant.technicalInterviews === 1 ? 'Pending Results' : applicant.technicalInterviews === 2 ? 'Pass' : 'Fail',
                applicant.hrInterviews === 0 ? 'Cancel' : applicant.hrInterviews === 1 ? 'Pending Results' : applicant.hrInterviews === 2 ? 'Pass' : 'Fail',
            ])
        ]

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")

        var encodedUri = encodeURI(csvContent)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "ApplicantList.csv")
        document.body.appendChild(link)

        link.click()
    }

    return (
        <>
            <Row>
            <Col className='d-flex align-items-center'>
                    <h1>Applicants</h1>
                </Col>
                <Col className='d-flex align-items-center text-end justify-content-end'>
                    {applicants && <Button onClick={exportHandler}>
                        DOWNLOAD <i class="fa fa-download"></i>
                    </Button>}
                </Col>
            </Row>
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
