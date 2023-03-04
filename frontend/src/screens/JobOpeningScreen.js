import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Form, Badge} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message' 
import { listJobOpeningDetails, createJobOpeningComment, verifyJobOpening } from '../actions/jobOpeningActions'
import { JOB_OPENING_CREATE_COMMENT_RESET, JOB_OPENING_VERIFY_RESET } from '../constants/jobOpeningConstants' 

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
    
    useEffect(() => {
        if(!userInfo && !recruiterInfo){
            history.push('/login')
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

    }, [dispatch, match, successJobOpeningComment, successVerification, history, userInfo, recruiterInfo])

    const registerHandler = () => {
        // history.push(`/placeorder/${match.params.id}`)
    }

    const applicantsHandler = () => {

    }

    const verifyHandler = () => {
        dispatch(verifyJobOpening(match.params.id))
    }

    const updateHandler = () => {
        
    }

    const deleteHandler = () => {

    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createJobOpeningComment(match.params.id, {
            description
        }))
    }

    return (
    <>
        {loadingVerification && <Loader/>}
        {errorVerification && <Message>{errorVerification}</Message>}
        {
            loading ?
            <Loader/> :
            error ?
            <Message>{error}</Message> :
            (   
                <>
                <Row>
                <Col md={7}>
                    <Image src={jobOpening.image} alt={jobOpening.nameOftheCompany} fluid/>
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
                            ) : (
                                <Button 
                                    onClick={registerHandler}
                                    className='col-12' 
                                    type='button'
                                    variant='success'
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
                                        variant='outline-dark'
                                        onClick={updateHandler}
                                    >
                                        <i class="fa fa-pencil" aria-hidden="true"></i> Update
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        className='col-12' 
                                        type='button'
                                        variant='outline-danger'
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
                                {
                                    jobOpening.eligibleStudents && jobOpening.eligibleStudents.map((student) => (
                                        <div>- {student}</div>
                                    ))
                                }
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
                            {userInfo ? (
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
