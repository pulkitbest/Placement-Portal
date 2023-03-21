import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'

const UserRegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [collegeEmail, setCollegeEmail] = useState('')
    const [rollNumber, setRollNumber] = useState('')
    const [phone, setPhone] = useState('')
    const [resume, setResume] = useState('')
    const [cgpa, setCgpa] = useState()
    const [tenthPercentage, setTenthPercentage] = useState()
    const [twelfthPercentage, setTwelfthPercentage] = useState()
    const [department, setDepartment] = useState('')
    const [programme, setProgramme] = useState('')
    const [lookingFor, setLookingFor] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [message, setMessage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [validated, setValidated] = useState(false)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo){
            history.push(`/student/verification/${userInfo._id}`)
        }

    }, [history, userInfo])

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
            collegeEmail, 
            rollNumber, 
            phone, 
            resume, 
            cgpa, 
            tenthPercentage, 
            twelfthPercentage, 
            department, 
            programme, 
            lookingFor,
            dateOfBirth
        ))
    }

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

    return (
        <FormContainer>
            <h1>Student Sign Up</h1>
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
                    <Form.Label>Personal Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Personal Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='collegeEmail'>
                    <Form.Label>College Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter College Email' 
                        value={collegeEmail} 
                        onChange={(e) => setCollegeEmail(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='rollNumber'>
                    <Form.Label>Enrollment Number</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Enrollment Number' 
                        value={rollNumber} 
                        onChange={(e) => setRollNumber(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='phone'>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type='tel' 
                        placeholder='Enter Mobile Number' 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='dateOfBirth'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        type='date' 
                        placeholder='Enter your Date of Birth' 
                        value={dateOfBirth} 
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='programme'>
                    <Form.Label>Programme</Form.Label>
                    <Form.Control 
                        as='select'
                        className='form-select'
                        value={programme}
                        required 
                        onChange={(e) => setProgramme(e.target.value)}>
                            <option key={'Select your programme from dropdown'} value={'Select your programme from dropdown'}>{'Select your programme from dropdown'}</option>
                            <option key={'B.Tech. - 4 Year'} value={'B.Tech. - 4 Year'}>{'B.Tech. - 4 Year'}</option>
                            <option key={'M.Tech. - 2 Year'} value={'M.Tech. - 2 Year'}>{'M.Tech. - 2 Year'}</option>
                            <option key={'MBA - 2 Year'} value={'MBA - 2 Year'}>{'MBA - 2 Year'}</option>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='department'>
                    <Form.Label>Department</Form.Label>
                    <Form.Control 
                        as='select'
                        className='form-select'
                        value={department}
                        required 
                        onChange={(e) => setDepartment(e.target.value)}>
                            <option key={'Select your department from dropdown'} value={'Select your department'}>{'Select your department'}</option>
                            <option key={'IT'} value={'IT'}>{'IT'}</option>
                            <option key={'IT-Business Informatics'} value={'IT-Business Informatics'}>{'IT-Business Informatics'}</option>
                            <option key={'ECE'} value={'ECE'}>{'ECE'}</option>
                            <option key={'Data Science and Analytics'} value={'Data Science and Analytics'}>{'Data Science and Analytics'}</option>
                            <option key={'Bio-Informatics'} value={'Bio-Informatics'}>{'Bio-Informatics'}</option>
                            <option key={'MBA'} value={'MBA'}>{'MBA'}</option>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='lookingFor'>
                    <Form.Label>Looking For</Form.Label>
                    <Form.Control 
                        as='select'
                        className='form-select'
                        value={lookingFor}
                        required 
                        onChange={(e) => setLookingFor(e.target.value)}>
                            <option key={'Select your preference'} value={'Select your preference'}>{'Select your preference'}</option>
                            <option key={'Summer Internship'} value={'Summer Internship'}>{'Summer Internship'}</option>
                            <option key={'Full Time and 6-month Internship'} value={'Full Time and 6-month Internship'}>{'Full Time and 6-month Internship'}</option>
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
                        required
                        onChange={uploadFileHandler}>
                    </Form.Control>
                    {uploading && <Loader/>}
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='cgpa'>
                    <Form.Label>CGPA</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Enter CGPA upto two decimal places' 
                        value={cgpa} 
                        step='.01'
                        required
                        onChange={(e) => setCgpa(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='tenthPercentage'>
                    <Form.Label>Percentage in 10th Grade</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Enter Percentage upto one decimal place' 
                        value={tenthPercentage} 
                        step='.1'
                        required
                        onChange={(e) => setTenthPercentage(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='twelfthPercentage'>
                    <Form.Label>Percentage in 12th Grade</Form.Label>
                    <Form.Control 
                        type='number' 
                        placeholder='Enter Percentage upto one decimal place' 
                        value={twelfthPercentage} 
                        step='.1'
                        required
                        onChange={(e) => setTwelfthPercentage(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h2> </h2>
                <Button type='submit' variant='success' className='col-12'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                Have an Account? <Link to={'/student/login'}>Log In</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default UserRegisterScreen
