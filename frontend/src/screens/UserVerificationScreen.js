import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {verify} from '../actions/userActions'

const UserVerificationScreen = ({match, history}) => {
    const userId = match.params.id

    const [otpForEmail, setOtpForEmail] = useState('')
    const [otpForCollegeEmail, setOtpForCollegeEmail] = useState('')
    const [otpForPhone, setOtpForPhone] = useState('')
    const [validated, setValidated] = useState(false)

    const dispatch = useDispatch()

    const userVerification = useSelector(state => state.userVerification)
    const {loading, error, success} = userVerification

    const redirect = '/'

    console.log(success)

    useEffect(() => {
        if(success){
            console.log(success)
            history.push(redirect)
        }

    }, [history, success, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        dispatch(verify(
            userId,
            otpForEmail,
            otpForCollegeEmail,
            otpForPhone,
        ))
    }

    return (
        <FormContainer>
            <h1>OTP Verification</h1>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Group controlId='otpForEmail'>
                    <Form.Label>OTP sent to Personal Email Account</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter OTP' 
                        value={otpForEmail} 
                        onChange={(e) => setOtpForEmail(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='otpForCollegeEmail'>
                    <Form.Label>OTP sent to College Email Account</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter OTP' 
                        value={otpForCollegeEmail} 
                        onChange={(e) => setOtpForCollegeEmail(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='otpForPhone'>
                    <Form.Label>OTP sent to Phone</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter OTP' 
                        value={otpForPhone} 
                        onChange={(e) => setOtpForPhone(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Button type='submit' variant='primary'>
                    Verify
                </Button>
            </Form>
        </FormContainer>
    )
}

export default UserVerificationScreen
