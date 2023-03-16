import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?'))
        dispatch(deleteUser(id))
    }

    const exportHandler = () => {
        const rows = [
            [
                'User ID',
                'Roll Number',
                'Name',
                'E-mail',
                'College E-mail',
                'Phone Number',
                'Department',
                'Programme',
                'D.O.B.',
                'C.G.P.A.',
                'X Percentage',
                'XII Percentage',
                'Verified',
                'Created At',
                'Updated At'
            ], 
            ...users.map(user => [
                user._id,
                user.rollNumber,
                user.name,
                user.email,
                user.collegeEmail,
                user.phone,
                user.department,
                user.programme,
                user.dateOfBirth,
                user.cgpa,
                user.tenthPercentage,
                user.twelfthPercentage,
                user.verified,
                user.createdAt,
                user.updatedAt
            ])
        ]

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")

        var encodedUri = encodeURI(csvContent)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri) 
        link.setAttribute("download", "StudentList.csv")
        document.body.appendChild(link)

        link.click()
    }


    return (
        <>
            <Row>
            <Col className='d-flex align-items-center'>
                    <h1>Students</h1>
                </Col>
                <Col className='d-flex align-items-center text-end justify-content-end'>
                    {users && <Button onClick={exportHandler}>
                        DOWNLOAD <i class="fa fa-download"></i>
                    </Button>}
                </Col>
            </Row>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th class="th-sm">ROLL NO.</th>
                            <th class="th-sm">NAME</th>
                            <th class="th-sm">EMAIL</th>
                            <th class="th-sm">COLLEGE EMAIL</th>
                            <th class="th-sm">CV</th>
                            <th class="th-sm">ADMIN</th>
                            <th class="th-sm">EDIT/DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.rollNumber}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td><a href={`mailto:${user.collegeEmail}`}>{user.collegeEmail}</a></td>
                                <td><Link to={`/cv/${user._id}`}><i class='fa-solid fa-link'></i></Link></td>
                                <td>{user.isAdmin ? <i className='fas fa-check' style={{color: 'green'}}></i> : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td> 
                                <td>
                                    <Link to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='dark' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </Link>    
                                    <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                </>
            )}
        </>
    )
}

export default UserListScreen