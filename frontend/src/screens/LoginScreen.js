import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login, generateOTP} from '../actions/userActions'

const LoginOTPScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')

    const dispatch = useDispatch() 

    const userGenerateOTP = useSelector(state => state.userGenerateOTP)
    const {loading, error, success} = userGenerateOTP

    const userLogin = useSelector(state => state.userLogin)
    const {loadingLogin, errorLogin, userInfo} = userLogin

    // const redirect = location.search ? location.search.split('=')[1] : '/' 

    useEffect(() => {
        if(userInfo){
            history.push('/')
        }

    }, [history, userInfo])

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, otp))
    }

    const generateOTPHandler = (e) => {
        e.preventDefault()
        dispatch(generateOTP(email))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {errorLogin && <Message variant='danger'>{errorLogin}</Message>}
            {loading && <Loader />}
            {loadingLogin && <Loader />}
            {!success ? 
            <Form onSubmit={generateOTPHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h2> </h2>
                <Button type='submit' variant='primary'>
                    Get OTP
                </Button>
            </Form> :
            <Form onSubmit={loginHandler}>
                <Form.Group controlId='otp'>
                    <Form.Label>OTP sent to your Phone</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter OTP' 
                        value={otp} onChange={(e) => setOTP(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h2> </h2>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>}
            <Row className='py-3'>
                <Col>
                New Customer? <Link to={'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginOTPScreen
