import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {verify} from '../actions/recruiterActions'

const RecruiterVerificationScreen = ({match, history}) => {
    const recruiterId = match.params.id

    const [otpForEmail, setOtpForEmail] = useState('')
    const [otpForMobileNumber, setOtpForMobileNumber] = useState('')
    const [validated, setValidated] = useState(false)

    const dispatch = useDispatch()

    const recruiterVerification = useSelector(state => state.recruiterVerification)
    const {loading, error, success} = recruiterVerification

    useEffect(() => {
        if(success){
            history.push('/recruiter')
        }

    }, [history, success])

    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        // setValidated(true);
        dispatch(verify(
            recruiterId,
            otpForEmail,
            otpForMobileNumber,
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
                <Form.Group controlId='otpForMobileNumber'>
                    <Form.Label>OTP sent to Mobile Number</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter OTP' 
                        value={otpForMobileNumber} 
                        onChange={(e) => setOtpForMobileNumber(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h2> </h2>
                <Button type='submit' variant='primary'>
                    Verify
                </Button>
            </Form>
        </FormContainer>
    )
}

export default RecruiterVerificationScreen
