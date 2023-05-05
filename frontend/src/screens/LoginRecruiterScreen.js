import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login, generateOTP} from '../actions/recruiterActions'

const LoginRecruiterScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')

    const dispatch = useDispatch()  

    const recruiterGenerateOTP = useSelector(state => state.recruiterGenerateOTP)
    const {loading, error, success} = recruiterGenerateOTP

    const recruiterLogin = useSelector(state => state.recruiterLogin)
    const {loading:loadingLogin, error:errorLogin, recruiterInfo} = recruiterLogin

    useEffect(() => {
        if(recruiterInfo){
            history.push('/recruiter')
        }

    }, [history, recruiterInfo])

    const loginHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, otp))
    }

    const generateOTPHandler = (e) => {
        e.preventDefault()
        dispatch(generateOTP(email))
    }

    const reEnterEmailHandler = (e) => {
        window.location.reload();
    }

    return (
        <FormContainer>
            <h1>Recruiter Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {errorLogin && <Message variant='danger'>{errorLogin}</Message>}
            {loading && <Loader />}
            {loadingLogin && <Loader />}
            {!success ? 
            <>
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
                <Button type='submit' variant='dark' className='col-12'>
                    Get OTP
                </Button>
            </Form> 
            <Row className='py-3'>
                <Col>
                New Here? <Link to={'/recruiter/register'}>Register</Link>
                </Col>
            </Row>
            </>:
            <>
            <Form onSubmit={loginHandler}>
                <Form.Group controlId='otp'>
                    <Form.Label>OTP sent to your Email</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='Enter OTP' 
                        value={otp} onChange={(e) => setOTP(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Button type='submit' variant='primary' className='col-12'>
                    Sign In
                </Button>
            </Form>
            <h4> </h4>
            <Button onClick={reEnterEmailHandler} variant='outline-secondary' className='col-12'>
                RE-ENTER EMAIL
            </Button>
            </>}
        </FormContainer>
    )
}

export default LoginRecruiterScreen
