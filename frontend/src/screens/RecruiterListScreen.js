import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listRecruiters, deleteRecruiter } from '../actions/recruiterActions'

const RecruiterListScreen = ({history}) => {
    const dispatch = useDispatch()

    const recruiterList = useSelector(state => state.recruiterList)
    const {loading, error, recruiters} = recruiterList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const recruiterDelete = useSelector(state => state.recruiterDelete)
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = recruiterDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin)
            dispatch(listRecruiters())
        else{
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?'))
        dispatch(deleteRecruiter(id)) 
    }

    const exportHandler = () => {
        const rows = [
            [
                'User ID',
                'Name',
                'Email',
                'Mobile Number',
                'Phone Number',
                'Company',
                'Designation',
                'Mode of Recruitment',
                'Verified',
                'Verified By Admin',
                'Created at',
                'Updated at'
            ], 
            ...recruiters.map(recruiter => [
                recruiter._id,
                recruiter.name,
                recruiter.email,
                recruiter.mobileNumber, 
                recruiter.phoneNumber,
                recruiter.nameOftheCompany,
                recruiter.designation,
                recruiter.modeOfRecruitment,
                recruiter.verified,
                recruiter.verifiedByAdmin,
                recruiter.createdAt,
                recruiter.updatedAt
            ])
        ]

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")

        var encodedUri = encodeURI(csvContent)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "RecruiterList.csv") 
        document.body.appendChild(link)

        link.click()
    }

    return (
        <>
            <Row>
                <Col className='d-flex align-items-center'>
                    <h1>Recruiters</h1>
                </Col>
                <Col className='d-flex align-items-center text-end justify-content-end'>
                    {recruiters && <Button onClick={exportHandler}>
                        DOWNLOAD <i class="fa fa-download"></i>
                    </Button>}
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>COMPANY</th>
                            <th>EMAIL</th>
                            <th>VERIFIED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruiters.map(recruiter => (
                            <tr key={recruiter._id}>
                                <td>{recruiter._id}</td>
                                <td>{recruiter.name}</td>
                                <td>{recruiter.nameOftheCompany}</td>
                                <td><a href={`mailto:${recruiter.email}`}>{recruiter.email}</a></td>
                                <td>{recruiter.verifiedByAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td> 
                                <td>
                                    <Link to={`/admin/recruiter/${recruiter._id}/edit`}>
                                        <Button variant='dark' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>    
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(recruiter._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default RecruiterListScreen
