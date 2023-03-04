import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/recruiterActions'

const RecruiterRegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [nameOftheCompany, setNameOftheCompany] = useState('')
    const [designation, setDesignation] = useState('')
    const [officeAddress, setOfficeAddress] = useState('')
    const [modeOfRecruitment, setModeOfRecruitment] = useState('')
    const [message, setMessage] = useState(null)
    const [validated, setValidated] = useState(false)

    const dispatch = useDispatch()

    const recruiterRegister = useSelector(state => state.recruiterRegister)
    const {loading, error, recruiterInfo} = recruiterRegister

    useEffect(() => {
        if(recruiterInfo){
            history.push(`/recruiter/verification/${recruiterInfo._id}`)
        }

    }, [history, recruiterInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        dispatch(register(
            name,
            email,
            mobileNumber,
            phoneNumber,
            nameOftheCompany,
            designation,
            officeAddress,
            modeOfRecruitment
        ))
    }

    return (
        <FormContainer>
            <h1>Recruiter Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form noValidate validated={validated} onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Enter Name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='mobileNumber'>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type='tel' 
                        placeholder='Enter Mobile Number' 
                        value={mobileNumber} 
                        onChange={(e) => setMobileNumber(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='phoneNumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                        type='tel' 
                        placeholder='Enter Phone Number' 
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='nameOftheCompany'>
                    <Form.Label>Name of the Company</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter name of the company' 
                        value={nameOftheCompany} 
                        onChange={(e) => setNameOftheCompany(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='designation'>
                    <Form.Label>Desgination</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter designation' 
                        value={designation} 
                        onChange={(e) => setDesignation(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='officeAddress'>
                    <Form.Label>Office Address</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter office Address' 
                        value={officeAddress} 
                        onChange={(e) => setOfficeAddress(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='modeOfRecruitment'>
                    <Form.Label>Mode of Recruitment</Form.Label>
                    <Form.Control 
                        as='select'
                        className='form-select'
                        value={modeOfRecruitment}   
                        required 
                        onChange={(e) => setModeOfRecruitment(e.target.value)}> 
                            <option key={'Select Mode of Recruitment'} value={'Select Mode of Recruitment'}>{'Select Mode of Recruitment'}</option>
                            <option key={'Online'} value={'Online'}>{'Online'}</option>
                            <option key={'Offline'} value={'Offline'}>{'Offline'}</option>
                            <option key={'Hybrid'} value={'Hybrid'}>{'Hybrid'}</option>
                    </Form.Control>
                </Form.Group>
                <h2> </h2>
                <Button type='submit' variant='success' className='col-12'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                Have an Account? <Link to={'/recruiter/login'}>Log In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RecruiterRegisterScreen
