import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login, generateOTP} from '../actions/userActions'

const LoginScreen = ({history}) => {

    const dispatch = useDispatch()

    const recruiterLogin = useSelector((state) => state.recruiterLogin)
    const { recruiterInfo } = recruiterLogin

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo){
            history.push('/student')
        }
        else if(recruiterInfo){
            history.push('/recruiter')
        }
    }, [history, userInfo, recruiterInfo])

    return (
        <FormContainer>
            <h1>Sign in as</h1>
            <Link to={'/student/login'}>
                <Button variant='dark' className='col-12'>
                    Student
                </Button>
            </Link>
            <h2> </h2>
            <Link to={'/recruiter/login'}>
            <Button variant='dark' className='col-12'>
                Recruiter
            </Button>
            </Link>
        </FormContainer>
    )
}

export default LoginScreen
