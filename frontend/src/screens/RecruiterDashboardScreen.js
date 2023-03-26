import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { Table, Button, Row, Col, ButtonGroup } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyJobOpenings, deleteJobOpening } from '../actions/jobOpeningActions'

const RecruiterDashboardScreen = ({history}) => {

    const dispatch = useDispatch()

    const recruiterLogin = useSelector((state) => state.recruiterLogin)
    const { recruiterInfo } = recruiterLogin

    const jobOpeningListMy = useSelector((state) => state.jobOpeningListMy)
    const {loading:loadingJobOpenings, error:errorJobOpenings, jobOpenings} = jobOpeningListMy

    const jobOpeningDelete = useSelector(state => state.jobOpeningDelete)
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = jobOpeningDelete

    useEffect(() => {
        if(!recruiterInfo){
            history.push('/login')
        } else { 
            console.log(recruiterInfo)
            console.log(recruiterInfo.verifiedByAdmin)
            dispatch(listMyJobOpenings())
        }
    }, [dispatch, recruiterInfo, successDelete, history])

    const deleteJobOpeningHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteJobOpening(id))
        }
    }

    const applicantsHandler = (id) => {
        history.push(`/applicants/${id}`)
    }
    
    const updateHandler = (id) => {
        history.push(`/updateJobOpening/${id}`)
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Job Opening created by you</h1>
                </Col>
                <Col className='text-end'>
                    {recruiterInfo && (
                        <Button className='my-3' disabled={!recruiterInfo.verifiedByAdmin} onClick={() => {
                            history.push('/createJobOpening')
                        }}>
                            {recruiterInfo.verifiedByAdmin ? (
                                <>
                                    <i className='fas fa-plus'></i> NEW  
                                </>
                            ) : (
                                <>
                                    Cannot create a Job Opening until Admin verifies you
                                </> 
                            )}
                        </Button>
                    )}
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingJobOpenings ? <Loader/> : errorJobOpenings ? <Message variant='danger'>{errorJobOpenings}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>TYPE</th>
                            <th>ROLE</th>
                            <th>CREATED ON</th>
                            <th>FORM DEADLINE</th>
                            <th>VERIFIED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobOpenings.map(jobOpening => (
                            <tr key={jobOpening._id}>
                                <td>
                                    <Link to={`/jobOpening/${jobOpening._id}`} style={{ textDecoration: 'none' }}>
                                        {jobOpening._id} <i class="fa fa-link" aria-hidden="true"></i>
                                    </Link>
                                </td>
                                <td>{jobOpening.nameOftheCompany}</td>
                                <td>{jobOpening.typeOfJobOpening}</td>
                                <td>{jobOpening.jobDesignation}</td> 
                                {jobOpening && jobOpening.createdAt && (
                                    <td>{jobOpening.createdAt.split('T')[0]}</td>
                                )}
                                {jobOpening && jobOpening.formDeadline && (
                                    <td>{jobOpening.formDeadline.split('T')[0]}</td>
                                )} 
                                <td>
                                {jobOpening.verifiedByAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}    
                                </td>     
                                <td>
                                    <ButtonGroup>
                                        <Button variant='info' className='btn-sm' onClick={() => applicantsHandler(jobOpening._id)}>
                                            <i class="fa-solid fa-newspaper"></i>
                                        </Button>
                                        <Button variant='dark' className='btn-sm' onClick={() => updateHandler(jobOpening._id)}>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteJobOpeningHandler(jobOpening._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default RecruiterDashboardScreen
