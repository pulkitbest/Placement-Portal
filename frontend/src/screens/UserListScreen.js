import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap'

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

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?'))
        dispatch(deleteUser(id))
    }

    const emailFormatter = (data) => {
        return <a href={`mailto:${data}`}>{data}</a>
    }

    const cvFormatter = (data) => {
        return <Link to={`/cv/${data}`}><i class='fa-solid fa-link'></i></Link>
    }

    const performFormatter = (data) => {
        return (
            <ButtonGroup>
                <Button variant='dark' className='btn-sm' onClick={() => history.push(`/admin/user/${data}/edit`)}>
                    <i className='fas fa-edit'></i>
                </Button>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(data)}>
                    <i className='fas fa-trash'></i>
                </Button>
            </ButtonGroup>
        )
    }

    const isAdminFormatter = (data) => {
        if(data === true){
            return <i className='fas fa-check' style={{color: 'green'}}></i>
        }
        return <i className='fas fa-times' style={{color: 'red'}}></i>
    }

    const columns = [
        {
            dataField: 'rollNumber',
            text: '',
            sort: true,
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'ROLL NUMBER',
            }),
        },
        {
            dataField: 'name',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'NAME',
            }),
        },
        {
            dataField: 'email',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'EMAIL',
            }),
            formatter: emailFormatter,
        },
        {
            dataField: 'phone',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'PHONE',
            }),
        },
        {
            dataField: '_id',
            text: 'CV',
            formatter: cvFormatter,
        },
        {
            dataField: 'isAdmin',
            text: 'ADMIN',
            formatter: isAdminFormatter,
        },
        {
            dataField: '_id',
            text: 'EDIT/DELETE',
            formatter: performFormatter,
        }
    ]

    const defaultSorted = [{
        dataField: 'rollNumber',
        order: 'asc'
    }]

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
            {loading && <Loader/>}
            {error && <Message>{error}</Message>}
            {users && 
                <BootstrapTable 
                    bootstrap4
                    keyField='_id' 
                    data={users} 
                    columns={columns} 
                    striped
                    condensed
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    defaultSorted={defaultSorted}
                />
            }
        </>
    )
}

export default UserListScreen