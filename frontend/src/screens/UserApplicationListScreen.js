import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyApplications } from '../actions/applicationActions'

const UserApplicationListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const applicationListMy = useSelector(state => state.applicationListMy)
    const {loading, error, applications} = applicationListMy

    useEffect(() => {
        if(userInfo)
            dispatch(listMyApplications())
        else{
            history.push('/login') 
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>Applications</h1>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>COMPANY</th>
                            <th>TYPE</th>
                            <th>ROLE</th>
                            <th>REGISTERED ON</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr key={application._id}>
                                <td>{application._id}</td>
                                <td>{application.jobOpening && application.jobOpening.nameOftheCompany}</td>
                                <td>{application.jobOpening && application.jobOpening.typeOfJobOpening}</td>
                                <td>{application.jobOpening && application.jobOpening.jobDesignation}</td>
                                <td>{application.createdAt && application.createdAt.substring(0, 10)}</td>
                                <td>
                                    <Link to={`/application/${application._id}`}>
                                        <i class="fa-solid fa-link"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserApplicationListScreen
