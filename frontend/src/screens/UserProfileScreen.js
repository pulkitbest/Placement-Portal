import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails} from '../actions/userActions'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const UserProfileScreen = ({history}) => {
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [],
    })

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
            }
        }

    }, [dispatch, history, userInfo, user])

    return (
        <Row>
            <Col md={4}>
                <h1 className='text-center'>USER PROFILE</h1>
                {loading && <Loader />}
                {error && <Message>{error}</Message>}
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Link to={'/student/profile/update'}>
                            <Button variant='outline-dark' className='col-12'>
                            <i className='fa fa-cog' aria-hidden="true"></i> update
                            </Button>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        Verification: {user.verified ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        Name: {user.name}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        Enrollment Number: {user.rollNumber}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        <i class="fa fa-envelope" aria-hidden="true"></i> <a href={`mailto:${user.email}`}>{user.email}</a>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        <i class="fa fa-envelope" aria-hidden="true"></i> <a href={`mailto:${user.collegeEmail}`}>{user.collegeEmail}</a>
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        <i class="fa fa-phone"></i> {user.phone}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        Programme: {user.programme}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        Department: {user.department}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        CGPA: {user.cgpa}
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        X Percentage: {user.tenthPercentage}%
                    </ListGroup.Item>
                    <ListGroup.Item className='text-center py-3'>
                        XII Percentage: {user.twelfthPercentage}%
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={1}> </Col>
            <Col md={7}>
                <h1 className='text-center'>RESUME</h1>
                {loading && <Loader />}
                {error && <Message>{error}</Message>}
                <div className="viewer">
                {user.resume&&(
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                    <Viewer fileUrl={user.resume} plugins={[defaultLayoutPluginInstance]}></Viewer>
                </Worker>
                )}
                </div>
            </Col>
        </Row>
    )
}

export default UserProfileScreen
