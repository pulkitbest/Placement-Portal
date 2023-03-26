import React, {useEffect} from 'react'
import {Button, Row, Col, ButtonGroup} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
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

    const emailFormatter = (data) => {
        return <a href={`mailto:${data}`}>{data}</a>
    }

    const isVerifiedFormatter = (data) => {
        if(data === true){
            return <i className='fas fa-check' style={{color: 'green'}}></i>
        }
        return <i className='fas fa-times' style={{color: 'red'}}></i>
    }

    const performFormatter = (data) => {
        return (
            <ButtonGroup>
                <Button variant='dark' className='btn-sm' onClick={() => history.push(`/admin/recruiter/${data}/edit`)}>
                    <i className='fas fa-edit'></i>
                </Button>
                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(data)}>
                    <i className='fas fa-trash'></i>
                </Button>
            </ButtonGroup>
        )
    }

    const columns = [
        {
            dataField: '_id',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'ID',
            })
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
            dataField: 'nameOftheCompany',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'COMPANY',
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
            dataField: 'verifiedByAdmin',
            text: 'VERIFIED',
            formatter: isVerifiedFormatter,
        },
        {
            dataField: '_id',
            text: 'EDIT/DELETE',
            formatter: performFormatter,
        }
    ]

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
                <BootstrapTable
                    bootstrap4
                    keyField='_id'
                    data={recruiters}
                    columns={columns}
                    striped
                    condensed
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                />
            )}
        </>
    )
}

export default RecruiterListScreen
