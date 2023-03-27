import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Form} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message' 
import { listJobOpeningDetails, createJobOpeningComment, verifyJobOpening, deleteJobOpening } from '../actions/jobOpeningActions'
import { createApplication, listMyApplications } from '../actions/applicationActions'
import { JOB_OPENING_CREATE_COMMENT_RESET, JOB_OPENING_VERIFY_RESET } from '../constants/jobOpeningConstants' 
import { APPLICATION_CREATE_RESET } from '../constants/applicationConstants'

const JobOpeningScreen = ({history, match}) => {
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    
    const jobOpeningDetails = useSelector(state => state.jobOpeningDetails)
    const {loading, error, jobOpening} = jobOpeningDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const recruiterLogin = useSelector((state) => state.recruiterLogin)
    const { recruiterInfo } = recruiterLogin

    const jobOpeningCommentCreate = useSelector(state => state.jobOpeningCommentCreate)
    const {success:successJobOpeningComment, error:errorJobOpeningComment} = jobOpeningCommentCreate

    const jobOpeningVerify = useSelector(state => state.jobOpeningVerify)
    const {loading:loadingVerification, success:successVerification, error:errorVerification} = jobOpeningVerify

    const jobOpeningDelete = useSelector(state => state.jobOpeningDelete)
    const {loading:loadingDelete, success:successDelete, error:errorDelete} = jobOpeningDelete

    const applicationCreate = useSelector(state => state.applicationCreate)
    const {loading:loadingApplication, success:successApplication, application, error:errorApplication} = applicationCreate

    const applicationListMy = useSelector(state => state.applicationListMy)
    const {loading:loadingApplicationList, error:errorApplicationList, applications:applicationList} = applicationListMy
    
    useEffect(() => {
        if(!userInfo && !recruiterInfo){
            history.push('/login')
        }
        if(successDelete){
            history.push('/login')
        }
        if(successApplication){
            dispatch({type: APPLICATION_CREATE_RESET}) 
            history.push(`/application/${application._id}`) 
        }
        if(successJobOpeningComment){
            alert('Comment Submitted!')
            setDescription('')
            dispatch({type: JOB_OPENING_CREATE_COMMENT_RESET})
        }
        if(successVerification){
            dispatch({type: JOB_OPENING_VERIFY_RESET})
        }
        dispatch(listJobOpeningDetails(match.params.id))
        if(userInfo) dispatch(listMyApplications())

    }, [dispatch, match, successDelete, successApplication, application, successJobOpeningComment, successVerification, history, userInfo, recruiterInfo])

    const registerHandler = () => {
        dispatch(createApplication({
            jobOpening: match.params.id,
            aptitudeTest: jobOpening.aptitudeTest ? 1 : 0,
            onlineTechnicalTest: jobOpening.onlineTechnicalTest ? 1 : 0,
            groupDiscussion: jobOpening.groupDiscussion ? 1 : 0,
            technicalInterviews: jobOpening.technicalInterviews ? 1 : 0,
            hrInterviews: jobOpening.hrInterviews ? 1 : 0,
        }))
    }

    const applicantsHandler = () => {
        history.push(`/applicants/${match.params.id}`)
    }

    const verifyHandler = () => {
        dispatch(verifyJobOpening(match.params.id))
    }

    const updateHandler = () => {
        history.push(`/updateJobOpening/${match.params.id}`)
    }

    const deleteHandler = () => {
        dispatch(deleteJobOpening(match.params.id))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createJobOpeningComment(match.params.id, {
            description
        }))
    }

    const jobOpeningObject = userInfo && applicationList && applicationList.flatMap(al => al.jobOpening).find(jo => jo._id === match.params.id)
    const alreadyRegistered = userInfo && applicationList && applicationList.find(al => al.jobOpening && al.jobOpening === jobOpeningObject)

    const applicationHandler = () => {
        history.push(`/application/${alreadyRegistered._id}`)
    }

    const isEligible = userInfo 
                        && jobOpening
                        && (userInfo.tenthPercentage >= jobOpening.tenthPercentage) 
                        && (userInfo.twelfthPercentage >= jobOpening.twelfthPercentage)
                        && (userInfo.cgpa >= jobOpening.cgpa)
                        && (
                            ((userInfo.programme + ' ' + userInfo.department) === 'B.Tech. - 4 Year IT' && jobOpening.bTechIT)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'B.Tech. - 4 Year IT-Business Informatics' && jobOpening.bTechITBI)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'B.Tech. - 4 Year ECE' && jobOpening.bTechECE)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'M.Tech. - 2 Year IT' && jobOpening.mTechIT)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'M.Tech. - 2 Year ECE' && jobOpening.mTechECE)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'M.Tech. - 2 Year Data Science and Analytics' && jobOpening.mTechDSA)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'M.Tech. - 2 Year Bio-Informatics' && jobOpening.mTechBI)
                            || ((userInfo.programme + ' ' + userInfo.department) === 'MBA - 2 Year MBA' && jobOpening.mba)
                        )

    return (
    <>
        {
            loading || loadingVerification || loadingApplication || loadingApplicationList || loadingDelete?
            <Loader/> :
            error || errorVerification || errorApplication || errorApplicationList || errorDelete?
            <Message>{error || errorVerification || errorApplication || errorApplicationList || errorDelete}</Message> :
            (   
                <>
                <Row>
                {userInfo && userInfo.isAdmin && jobOpening.recruiter && <Message>Posted by: {jobOpening.recruiter.name} | Recruiter ID: {jobOpening.recruiter._id}</Message>}
                <Col md={7}>
                    <Image src={jobOpening.image} alt={jobOpening.nameOftheCompany} fluid className="rounded mx-auto d-block"/>
                </Col>
                <Col md={5}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{jobOpening.nameOftheCompany}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Type of Job</div>
                                - {jobOpening.typeOfJobOpening}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Role</div>
                                - {jobOpening.jobDesignation}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Description</div>
                                - {jobOpening.jobDescription}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Last Date for Applying</div>
                                {
                                    jobOpening.formDeadline && <div>
                                        - {jobOpening.formDeadline.split('T')[0]}
                                    </div>
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <h2> </h2>
                    {
                        recruiterInfo ? (
                            jobOpening.verifiedByAdmin ? (
                                <Button 
                                    className='col-12' 
                                    type='button'
                                    variant='info'
                                    onClick={applicantsHandler}
                                >
                                    Applicants
                                </Button>
                            ) : (
                                <Button 
                                    className='col-12' 
                                    type='button'
                                    variant='dark'
                                    disabled
                                >
                                    Job Opening not verified by admin
                                </Button>
                            )
                        ) : userInfo ? (
                            userInfo.isAdmin ? (
                                jobOpening.verifiedByAdmin ? (
                                    <Button 
                                        className='col-12' 
                                        type='button'
                                        variant='info'
                                        onClick={applicantsHandler}
                                    >
                                        Applicants
                                    </Button>
                                ) : (
                                    <Button
                                        className='col-12' 
                                        type='button'
                                        variant='success'
                                        onClick={verifyHandler}
                                    >
                                        Verify this Job Opening
                                    </Button>
                                )
                            ) : alreadyRegistered ? (
                                <Button 
                                    onClick={applicationHandler}
                                    className='col-12' 
                                    type='button'
                                    variant='info'
                                >
                                    View Progress
                                </Button>
                            ) : (
                                <Button 
                                    onClick={registerHandler}
                                    className='col-12' 
                                    type='button'
                                    variant='success'
                                    disabled={!isEligible}
                                >
                                    Register
                                </Button>
                            )
                        ) : (
                            <>
                            </>
                        )
                    }
                    <p> </p>
                    {
                        recruiterInfo && (
                            <Row>
                                <Col>
                                    <Button 
                                        className='col-12' 
                                        type='button'
                                        variant='dark'
                                        onClick={updateHandler}
                                    >
                                        <i class="fa fa-pencil" aria-hidden="true"></i> Update
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        className='col-12' 
                                        type='button'
                                        variant='danger'
                                        onClick={deleteHandler}
                                    >
                                        <i class="fa fa-trash" aria-hidden="true"></i> Delete
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }
                    <p> </p>
                    {
                        userInfo && userInfo.isAdmin && (
                                <Button 
                                    className='col-12' 
                                    type='button'
                                    variant='danger'
                                    onClick={deleteHandler}
                                >
                                    <i class="fa fa-trash" aria-hidden="true"></i> Delete
                                </Button>
                        )
                    }
                </Col>
            </Row>
            <h2> </h2>
            <Row>
                <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Details</h2>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Expected Intake of Students</div>
                                <div>- {jobOpening.minIntakeOfStudents} to {jobOpening.maxIntakeOfStudents}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Compensation Details For B. Tech. Students</div>
                                <div>- CTC: {jobOpening.bTechCTC}</div>
                                <div>- Base Pay: {jobOpening.bTechBasePay}</div>
                                <div>- Stocks: {jobOpening.bTechStocks}</div>
                                <div>- Stock Options: {jobOpening.bTechStockOptions}</div>
                                <div>- Detailed Breakdown: {jobOpening.bTechDetailedBreakDown}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Compensation Details For M. Tech. Students</div>
                                <div>- CTC: {jobOpening.mTechCTC}</div>
                                <div>- Base Pay: {jobOpening.mTechBasePay}</div>
                                <div>- Stocks: {jobOpening.mTechStocks}</div>
                                <div>- Stock Options: {jobOpening.mTechStockOptions}</div>
                                <div>- Detailed Breakdown: {jobOpening.mTechDetailedBreakDown}</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Service Bond</div>
                                - {jobOpening.serviceBond}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'> 
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Medical Requirements</div>
                                - {jobOpening.medicalRequirements}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Relocation Benefits</div>
                                - {jobOpening.relocationBenefits}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item  variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Tentative Job Location</div>
                                - {jobOpening.tentativeJobLocation}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item variant='dark'>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Tentative Joining Date</div>
                                {
                                    jobOpening.tentativeJoiningDate && <div>
                                        - {jobOpening.tentativeJoiningDate.split('T')[0]}
                                    </div>
                                }
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Process</h2>
                        </ListGroup.Item>
                        <ListGroup.Item variant='dark'>
                            <div className="ms-2 me-auto">  
                            <div className="fw-bold">Eligible Students</div>
                                {jobOpening.bTechIT && <div>- B.Tech. - 4 Year IT</div>}
                                {jobOpening.bTechITBI && <div>- B.Tech. - 4 Year IT-Business Informatics</div>}
                                {jobOpening.bTechECE && <div>- B.Tech. - 4 Year ECE</div>}
                                {jobOpening.mTechIT && <div>- M.Tech. - 2 Year IT</div>}
                                {jobOpening.mTechECE && <div>- M.Tech. - 2 Year ECE</div>}
                                {jobOpening.mTechDSA && <div>- M.Tech. - 2 Year Data Science and Analytics</div>}
                                {jobOpening.mTechBI && <div>- M.Tech. - 2 Year Bio-Informatics</div>}
                                {jobOpening.mba && <div>- MBA - 2 Year MBA</div>}
                                <div>- Minimum {jobOpening.tenthPercentage}% in X</div>
                                <div>- Minimum {jobOpening.twelfthPercentage}% in XII</div>
                                <div>- Minimum {jobOpening.cgpa} cgpa in UG</div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item variant='dark'>
                            <div className="ms-2 me-auto">  
                            <div className="fw-bold">Selection Process</div>
                                <div>- Aptitude Test: {jobOpening.aptitudeTest ? <i class="fa fa-check" style={{color: 'green'}}></i> : <i class="fa fa-times" style={{color: 'red'}}></i>}</div>
                                <div>- Online Technical Test: {jobOpening.onlineTechnicalTest ? <i class="fa fa-check" style={{color: 'green'}}></i> : <i class="fa fa-times" style={{color: 'red'}}></i>}</div>
                                <div>- Group Discussion: {jobOpening.groupDiscussion ? <i class="fa fa-check" style={{color: 'green'}}></i> : <i class="fa fa-times" style={{color: 'red'}}></i>}</div>
                                <div>- Technical Interviews: {jobOpening.technicalInterviews ? <i class="fa fa-check" style={{color: 'green'}}></i> : <i class="fa fa-times" style={{color: 'red'}}></i>}</div>
                                <div>- HR Interviews: {jobOpening.hrInterviews ? <i class="fa fa-check" style={{color: 'green'}}></i> : <i class="fa fa-times" style={{color: 'red'}}></i>}</div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <h4> </h4>
            <Row>
            <Col md={7}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Q&A</h2>
                            {jobOpening.comments.length === 0 && <Message variant='secondary'>No Queries</Message>}
                        </ListGroup.Item>
                        {jobOpening.comments.map(comment => (
                            <ListGroup.Item key={comment._id} variant='dark'>
                                <strong><i class="fa-regular fa-user-circle"></i> {comment.name}</strong>
                                <p><i class="fa-regular fa-comment"></i> {comment.description}</p>
                                <strong><i class="fa-regular fa-calendar"></i> {comment.createdAt.substring(0, 10)}</strong>
                            </ListGroup.Item> 
                        ))}
                        <ListGroup.Item variant='dark'>
                            <h4> </h4>
                            <h4>Write a Query</h4>
                            {errorJobOpeningComment && <Message variant='danger'>{errorJobOpeningComment}</Message>}
                            {userInfo || recruiterInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='commment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={description} onChange={(e) => setDescription(e.target.value)}>   
                                        </Form.Control>
                                    </Form.Group>
                                    <p> </p>
                                    <Button type='submit' variant='primary'>
                                        Submit
                                    </Button>
                                </Form>
                            ) : <Message>Please <Link to='/login'>sign in</Link> to write a comment.</Message>}
                            <h4> </h4>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )
        }
    </>
    )
}

export default JobOpeningScreen
