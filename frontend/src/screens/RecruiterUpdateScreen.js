import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getRecruiterDetails, updateRecruiterProfile} from '../actions/recruiterActions'
import { RECRUITER_UPDATE_PROFILE_RESET } from '../constants/recruiterConstants'

const RecruiterUpdateScreen = ({location, history}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [nameOftheCompany, setNameOftheCompany] = useState('')
  const [designation, setDesignation] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [modeOfRecruitment, setModeOfRecruitment] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const recruiterDetails = useSelector(state => state.recruiterDetails)
  const {loading, error, recruiter} = recruiterDetails

  const recruiterLogin = useSelector(state => state.recruiterLogin)
  const {recruiterInfo} = recruiterLogin

  const recruiterUpdateProfile = useSelector(state => state.recruiterUpdateProfile)
  const {success} = recruiterUpdateProfile

  useEffect(() => {
      if(!recruiterInfo){
          history.push('/login')
      } else {
          if(!recruiter || !recruiter.name || success){
              dispatch({type: RECRUITER_UPDATE_PROFILE_RESET})
              dispatch(getRecruiterDetails('profile'))
          } else{
              setName(recruiter.name)
              setEmail(recruiter.email)
              setMobileNumber(recruiter.mobileNumber)
              setPhoneNumber(recruiter.phoneNumber)
              setNameOftheCompany(recruiter.nameOftheCompany)
              setDesignation(recruiter.designation)
              setOfficeAddress(recruiter.officeAddress)
              setModeOfRecruitment(recruiter.modeOfRecruitment)
          }
      }

  }, [dispatch, history, recruiterInfo, recruiter, success])

  const submitHandler = (e) => {
      e.preventDefault()
      setMessage('Profile Updated!')
      dispatch(updateRecruiterProfile({
          id: recruiter._id,
          name,
          email,
          mobileNumber,
          phoneNumber,
          nameOftheCompany,
          designation,
          officeAddress,
          modeOfRecruitment,
      }))
  }

  return (
      <FormContainer>
          <h1>Recruiter Profile</h1>
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
                            <option key={'Select the mode of recruitment'} value={'Select the mode of recruitment'}>{'Select the mode of recruitment'}</option>
                            <option key={'Online'} value={'Online'}>{'Online'}</option>
                            <option key={'Offline'} value={'Offline'}>{'Offline'}</option>
                            <option key={'Hybrid'} value={'Hybrid'}>{'Hybrid'}</option>
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

export default RecruiterUpdateScreen
