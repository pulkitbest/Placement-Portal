import React, { useEffect, useState } from 'react'
import {Button, Row, Col, ListGroup, Alert, Form} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getApplicationDetails, updateApplication } from '../actions/applicationActions'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { APPLICATION_UPDATE_RESET } from '../constants/applicationConstants'

const ApplicationScreen = ({match, history}) => {
    const applicationId = match.params.id

    const dispatch = useDispatch()
    
    const applicationDetails = useSelector(state => state.applicationDetails)
    const {application, loading, error} = applicationDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const recruiterLogin = useSelector((state) => state.recruiterLogin)
    const {recruiterInfo} = recruiterLogin

    const applicationUpdate = useSelector(state => state.applicationUpdate)
    const  {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = applicationUpdate

    const [aptitudeTest, setAptitudeTest] = useState(0)
    const [onlineTechnicalTest, setOnlineTechnicalTest] = useState(0)
    const [groupDiscussion, setGroupDiscussion] = useState(0)
    const [technicalInterviews, setTechnicalInterviews] = useState(0)
    const [hrInterviews, setHrInterviews] = useState(0)

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [],
    })

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateApplication({
            _id: applicationId,
            aptitudeTest,
            onlineTechnicalTest,
            groupDiscussion,
            technicalInterviews,
            hrInterviews
        }))
    }

    useEffect(() => {
        if(!userInfo && !recruiterInfo){
            history.push('/login')
        }
        if(successUpdate){
            dispatch({type: APPLICATION_UPDATE_RESET})
            dispatch(getApplicationDetails(applicationId))
        }
        if(!application || (application && application._id !== applicationId)){
            dispatch(getApplicationDetails(applicationId))
        } else {
            setAptitudeTest(application.aptitudeTest)
            setOnlineTechnicalTest(application.onlineTechnicalTest)
            setGroupDiscussion(application.groupDiscussion)
            setTechnicalInterviews(application.technicalInterviews)
            setHrInterviews(application.hrInterviews)
        }
        
    }, [dispatch, applicationId, application, history, userInfo, recruiterInfo, successUpdate])

    return (
        <>
            {(loading || loadingUpdate) ? <Loader/> : (error || errorUpdate) ? <Message variant='danger'>{error || errorUpdate}</Message> :
                application && 
                <Row>
                    <Row>
                    {
                        (
                            application.aptitudeTest===3 || 
                            application.onlineTechnicalTest===3 || 
                            application.groupDiscussion===3 || 
                            application.technicalInterviews===3 || 
                            application.hrInterviews===3
                        ) ?
                        <Alert variant="danger" className="text-center">
                            <strong className="fw-bold">Rejected <i className='fas fa-times' style={{color: 'red'}}></i></strong>
                        </Alert> : 
                        ((application.aptitudeTest===2 || application.aptitudeTest===0) && 
                        (application.onlineTechnicalTest===2 || application.onlineTechnicalTest===0) && 
                        (application.groupDiscussion===2 || application.groupDiscussion===0) && 
                        (application.technicalInterviews===2 || application.technicalInterviews===0) &&
                        (application.hrInterviews===2 || application.hrInterviews===0)) ?
                        <Alert variant="success" className="text-center">
                            <strong className="fw-bold">Selected <i className='fas fa-check' style={{color: 'green'}}></i></strong>
                        </Alert> :
                        <Alert className="text-center">
                            <strong className="fw-bold">Pending Results <i className='fas fa-hourglass'></i></strong>
                        </Alert>
                    } 
                    </Row>
                    <Row>
                    <Col md={6}>
                    {
                        application.user && application.jobOpening &&  
                            <ListGroup>
                                <h2 className='text-center'>APPLICATION</h2>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Name: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.user.name}</strong>  
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Roll Number: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.user.rollNumber}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Email: </strong>
                                    </Col>
                                    <Col>
                                        <strong><a href={`mailto:${application.user.email}`}>{application.user.email}</a></strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">College Email: </strong>
                                    </Col>
                                    <Col>
                                        <strong><a href={`mailto:${application.user.collegeEmail}`}>{application.user.collegeEmail}</a></strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Phone: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.user.phone}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Programme: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.user.programme}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Branch: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.user.department}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Company: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.jobOpening.nameOftheCompany}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Type of Job: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.jobOpening.typeOfJobOpening}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Role: </strong>
                                    </Col>
                                    <Col>
                                        <strong>{application.jobOpening.jobDesignation}</strong>
                                    </Col>
                                    </Row>
                                </ListGroup.Item>
                                {userInfo && application.aptitudeTest !== 0 && <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Aptitude Test: </strong>
                                    </Col>
                                    <Col>
                                        {application.aptitudeTest === 1 && <strong><i class="far fa-hourglass"></i></strong>}
                                        {application.aptitudeTest === 2 && <strong><i className='fas fa-check' style={{color: 'green'}}></i></strong>}
                                        {application.aptitudeTest === 3 && <strong><i className='fas fa-times' style={{color: 'red'}}></i></strong>}
                                    </Col>
                                    </Row>
                                </ListGroup.Item>}
                                {userInfo && application.onlineTechnicalTest !== 0 && <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Online Technical Test: </strong>
                                    </Col>
                                    <Col>
                                        {application.onlineTechnicalTest === 1 && <strong><i class="far fa-hourglass"></i></strong>}
                                        {application.onlineTechnicalTest === 2 && <strong><i className='fas fa-check' style={{color: 'green'}}></i></strong>}
                                        {application.onlineTechnicalTest === 3 && <strong><i className='fas fa-times' style={{color: 'red'}}></i></strong>}
                                    </Col>
                                    </Row>
                                </ListGroup.Item>}
                                {userInfo && application.groupDiscussion !== 0 && <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Group Discussion: </strong>
                                    </Col>
                                    <Col>
                                        {application.groupDiscussion === 1 && <strong><i class="far fa-hourglass"></i></strong>}
                                        {application.groupDiscussion === 2 && <strong><i className='fas fa-check' style={{color: 'green'}}></i></strong>}
                                        {application.groupDiscussion === 3 && <strong><i className='fas fa-times' style={{color: 'red'}}></i></strong>}
                                    </Col>
                                    </Row>
                                </ListGroup.Item>}
                                {userInfo && application.technicalInterviews !== 0 && <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">Technical Interviews: </strong>
                                    </Col>
                                    <Col>
                                        {application.technicalInterviews === 1 && <strong><i class="far fa-hourglass"></i></strong>}
                                        {application.technicalInterviews === 2 && <strong><i className='fas fa-check' style={{color: 'green'}}></i></strong>}
                                        {application.technicalInterviews === 3 && <strong><i className='fas fa-times' style={{color: 'red'}}></i></strong>}
                                    </Col>
                                    </Row>
                                </ListGroup.Item>}
                                {userInfo && application.hrInterviews !== 0 && <ListGroup.Item>
                                    <Row>
                                    <Col>
                                        <strong className="fw-bold">HR Interviews: </strong>
                                    </Col>
                                    <Col>
                                        {application.hrInterviews === 1 && <strong><i class="far fa-hourglass"></i></strong>}
                                        {application.hrInterviews === 2 && <strong><i className='fas fa-check' style={{color: 'green'}}></i></strong>}
                                        {application.hrInterviews === 3 && <strong><i className='fas fa-times' style={{color: 'red'}}></i></strong>}
                                    </Col>
                                    </Row>
                                </ListGroup.Item>}
                                {
                                    recruiterInfo && <ListGroup.Item>
                                        <Form onSubmit={submitHandler}>
                                            <h4> </h4>
                                            <Form.Group controlId='aptitudeTest'>
                                                <Row>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Label className='fw-bold'>Aptitude Test:</Form.Label>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Control
                                                            as='select'
                                                            className='form-select'
                                                            value={aptitudeTest}
                                                            onChange={(e) => setAptitudeTest(e.target.value)}
                                                        >
                                                            <option key={'Cancel Test'} value={0}>{'Cancel Test'}</option>
                                                            <option key={'Delay Results'} value={1}>{'Delay Results'}</option>
                                                            <option key={'Pass'} value={2}>{'Pass'}</option>
                                                            <option key={'Fail'} value={3}>{'Fail'}</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <p> </p>
                                            <Form.Group controlId='onlineTechnicalTest'>
                                                <Row>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Label className='fw-bold'>Online Technical Test:</Form.Label>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Control
                                                            as='select'
                                                            className='form-select'
                                                            value={onlineTechnicalTest}
                                                            onChange={(e) => setOnlineTechnicalTest(e.target.value)}
                                                        >
                                                            <option key={'Cancel Test'} value={0}>{'Cancel Test'}</option>
                                                            <option key={'Delay Results'} value={1}>{'Delay Results'}</option>
                                                            <option key={'Pass'} value={2}>{'Pass'}</option>
                                                            <option key={'Fail'} value={3}>{'Fail'}</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <p> </p>
                                            <Form.Group controlId='groupDiscussion'>
                                                <Row>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Label className='fw-bold'>Group Discussion:</Form.Label>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Control
                                                            as='select'
                                                            className='form-select'
                                                            value={groupDiscussion}
                                                            onChange={(e) => setGroupDiscussion(e.target.value)}
                                                        >
                                                            <option key={'Cancel Test'} value={0}>{'Cancel Test'}</option>
                                                            <option key={'Delay Results'} value={1}>{'Delay Results'}</option>
                                                            <option key={'Pass'} value={2}>{'Pass'}</option>
                                                            <option key={'Fail'} value={3}>{'Fail'}</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <p> </p>
                                            <Form.Group controlId='technicalInterviews'>
                                                <Row>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Label className='fw-bold'>Technical Interviews:</Form.Label>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Control
                                                            as='select'
                                                            className='form-select'
                                                            value={technicalInterviews}
                                                            onChange={(e) => setTechnicalInterviews(e.target.value)}
                                                        >
                                                            <option key={'Cancel Test'} value={0}>{'Cancel Test'}</option>
                                                            <option key={'Delay Results'} value={1}>{'Delay Results'}</option>
                                                            <option key={'Pass'} value={2}>{'Pass'}</option>
                                                            <option key={'Fail'} value={3}>{'Fail'}</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <p> </p>
                                            <Form.Group controlId='hrInterviews'>
                                                <Row>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Label className='fw-bold'>HR Interviews:</Form.Label>
                                                    </Col>
                                                    <Col className="d-flex align-items-center">
                                                        <Form.Control
                                                            as='select'
                                                            className='form-select'
                                                            value={hrInterviews}
                                                            onChange={(e) => setHrInterviews(e.target.value)}
                                                        >
                                                            <option key={'Cancel Test'} value={0}>{'Cancel Test'}</option>
                                                            <option key={'Delay Results'} value={1}>{'Delay Results'}</option>
                                                            <option key={'Pass'} value={2}>{'Pass'}</option>
                                                            <option key={'Fail'} value={3}>{'Fail'}</option>
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                            <p> </p>
                                            <Button className='col-12' type='submit' variant='success'>
                                                Submit
                                            </Button> 
                                            <h4> </h4>
                                        </Form>
                                    </ListGroup.Item>
                                }
                            </ListGroup>
                    }
                    </Col>
                    <Col md = {6}>
                        <h2 className='text-center'>RESUME</h2>
                        {loading && <Loader />}
                        {error && <Message>{error}</Message>}
                        <div className="viewer">
                        {application.user.resume&&(
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                            <Viewer fileUrl={application.user.resume} plugins={[defaultLayoutPluginInstance]}></Viewer>
                        </Worker>
                        )}
                        </div>
                    </Col>
                    </Row>
                </Row>
            }
        </>
    )
}

export default ApplicationScreen
