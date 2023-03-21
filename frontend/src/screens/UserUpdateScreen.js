import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const UserUpdateScreen = ({location, history}) => {
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

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else{
                setName(user.name)
                setEmail(user.email)
                setCollegeEmail(user.collegeEmail)
                setRollNumber(user.rollNumber)
                setPhone(user.phone)
                setResume(user.resume)
                setCgpa(user.cgpa)
                setTenthPercentage(user.tenthPercentage)
                setTwelfthPercentage(user.twelfthPercentage)
                setDepartment(user.department)
                setProgramme(user.programme)
                setLookingFor(user.lookingFor)
                setDateOfBirth(user.dateOfBirth)
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
        setMessage('Profile Updated!')
        dispatch(updateUserProfile({
            id: user._id,
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
        }))
    }

    return (
        <FormContainer>
            <h1>User Profile</h1>
            {loading && <Loader />}
            {message && message==='Profile Updated!' && <Message variant='success'>{message}</Message>}
            {message && message!=='Profile Updated!' && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type='name' 
                        placeholder='Enter Name' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='email'>
                    <Form.Label>Personal Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter Personal Email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='collegeEmail'>
                    <Form.Label>College Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder='Enter College Email' 
                        value={collegeEmail} 
                        onChange={(e) => setCollegeEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='rollNumber'>
                    <Form.Label>Enrollment Number</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='Enter Enrollment Number' 
                        value={rollNumber} 
                        onChange={(e) => setRollNumber(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='phone'>
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control 
                        type='tel' 
                        placeholder='Enter Mobile Number' 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='dateOfBirth'>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control 
                        type='date' 
                        placeholder='Enter your Date of Birth' 
                        value={dateOfBirth} 
                        onChange={(e) => setDateOfBirth(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h4> </h4>
                <Form.Group controlId='programme'>
                    <Form.Label>Programme</Form.Label>
                    <Form.Control 
                        as='select'
                        className='form-select'
                        value={programme} 
                        onChange={(e) => setProgramme(e.target.value)}>
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
                        onChange={(e) => setDepartment(e.target.value)}>
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
                        onChange={(e) => setLookingFor(e.target.value)}>
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
                        onChange={(e) => setTwelfthPercentage(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <h2> </h2>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
                <h2> </h2>
                {message && message==='Profile Updated!' && <Message variant='success'>{message}</Message>}
                {message && message!=='Profile Updated!' && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
            </Form>
        </FormContainer>
    )
}

export default UserUpdateScreen
