import React, { useEffect } from 'react'
import {Button, Row, Col, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getApplicationDetails } from '../actions/applicationActions'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const ApplicationScreen = ({match, history}) => {
    const applicationId = match.params.id

    const dispatch = useDispatch()
    
    const applicationDetails = useSelector(state => state.applicationDetails)
    const {application, loading, error} = applicationDetails

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const recruiterLogin = useSelector((state) => state.recruiterLogin)
    const {recruiterInfo} = recruiterLogin

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [],
    })

    useEffect(() => {
        if(!userInfo && !recruiterInfo){
            history.push('/login')
        }
        if(!application || (application && application._id !== applicationId)){
            dispatch(getApplicationDetails(applicationId))
        }
        
    }, [dispatch, applicationId, application, history, userInfo, recruiterInfo])

    return (
        <>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
                application && 
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
            }
        </>
    )
}

export default ApplicationScreen
