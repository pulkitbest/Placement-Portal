import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Nav, Form, Button, Row, Col, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [resume, setResume] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else{
                setName(user.name)
                setEmail(user.email)
                setResume(user.resume)
            }
        }

    }, [dispatch, history, userInfo, user, success])

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload/resume', formData, config)
            setResume(data)
            setUploading(false)
        } catch (errorUploading) {
            console.error(errorUploading)
            setMessage('Only .pdf file accepted!')
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            setMessage('Profile Updated!')
            dispatch(updateUserProfile({id: user._id, name, email, password, resume}))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && message==='Profile Updated!' && <Message variant='success'>{message}</Message>}
                {message && message!=='Profile Updated!' && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='name' 
                            placeholder='Enter Name' 
                            value={name} onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <h4> </h4>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type='email' 
                            placeholder='Enter Email' 
                            value={email} onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <h4> </h4>
                    <Form.Group controlId='resume'>
                        <Form.Label>Upload your CV in .pdf format</Form.Label>
                        <Form.Control 
                            type='file'
                            id='file' 
                            label='Choose File' 
                            custom 
                            onChange={uploadFileHandler}>
                        </Form.Control>
                        {uploading && <Loader/>}
                    </Form.Group>
                    <h4> </h4>
                    <Form.Group controlId='password'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Enter Password' 
                            value={password} onChange={(e) => setPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <h4> </h4>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                    <h2> </h2>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
                <h1> </h1>
                <Link to={`/cv/${user._id}`}>
                    <Button variant='info'>
                        Resume
                    </Button>
                </Link>
            </Col>
            <Col md={9}>
                <h2>My Applications</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>CODING ROUNDS</th>
                                <th>INTERVIEWS</th>
                                <th>DETAILS</th>
                            </tr>
                        </thead>
                        <tbody>
                           {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0,10) : 
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    } 
                                </td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    }
                                </td>
                                <td>
                                    <Nav.Link as={Link} to={`/order/${order._id}`}>
                                        <Button variant='dark'>DETAILS</Button>
                                    </Nav.Link>
                                </td>
                            </tr>
                           ))} 
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
