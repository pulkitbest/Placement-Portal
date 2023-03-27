import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col} from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import filterFactory, {textFilter} from 'react-bootstrap-table2-filter'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listApplicants } from '../actions/applicationActions'

const ApplicantScreen = ({history, match}) => {
    const jobOpeningId = match.params.id
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const recruiterLogin = useSelector(state => state.recruiterLogin)
    const {recruiterInfo} = recruiterLogin

    const applicantList = useSelector(state => state.applicantList)
    const {loading, error, applicants} = applicantList

    useEffect(() => { 
        if((userInfo && userInfo.isAdmin) || recruiterInfo){
            dispatch(listApplicants(jobOpeningId))
        }
        else{
            history.push('/login') 
        }
    }, [dispatch, history, userInfo, recruiterInfo, jobOpeningId])

    const exportHandler = () => {
        const rows = [
            [
                'Application ID',
                'User ID',
                'Name',
                'Roll Number',
                'Email',
                'Phone',
                'Aptitude Test',
                'Online Technical Test',
                'Group Discussion',
                'Technical Interviews',
                'HR Interviews'
            ], 
            ...applicants.map(applicant => [
                applicant._id,
                applicant.userId,
                applicant.userName,
                applicant.userRollNumber,
                applicant.userEmail,
                applicant.userPhone,
                applicant.aptitudeTest === 0 ? 'Cancel' : applicant.aptitudeTest === 1 ? 'Pending Results' : applicant.aptitudeTest === 2 ? 'Pass' : 'Fail',
                applicant.onlineTechnicalTest === 0 ? 'Cancel' : applicant.onlineTechnicalTest === 1 ? 'Pending Results' : applicant.onlineTechnicalTest === 2 ? 'Pass' : 'Fail',
                applicant.groupDiscussion === 0 ? 'Cancel' : applicant.groupDiscussion === 1 ? 'Pending Results' : applicant.groupDiscussion === 2 ? 'Pass' : 'Fail',
                applicant.technicalInterviews === 0 ? 'Cancel' : applicant.technicalInterviews === 1 ? 'Pending Results' : applicant.technicalInterviews === 2 ? 'Pass' : 'Fail',
                applicant.hrInterviews === 0 ? 'Cancel' : applicant.hrInterviews === 1 ? 'Pending Results' : applicant.hrInterviews === 2 ? 'Pass' : 'Fail',
            ])
        ]

        let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")

        var encodedUri = encodeURI(csvContent)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "ApplicantList.csv")
        document.body.appendChild(link)

        link.click()
    }

    const emailFormatter = (data) => {
        return <a href={`mailto:${data}`}>{data}</a>
    }

    const detailsFormatter = (data) => {
        return <Link to={`/application/${data}`}><i class='fa-solid fa-link'></i></Link>
    }

    const columns = [
        {
            dataField: '_id',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'APPLICATION ID',
            })
        },
        {
            dataField: 'userRollNumber',
            text: '',
            sort: true,
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'ROLL NUMBER',
            }),
        },
        {
            dataField: 'userName',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'NAME',
            }),
        },
        {
            dataField: 'userEmail',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'EMAIL',
            }),
            formatter: emailFormatter,
        },
        {
            dataField: 'userPhone',
            text: '',
            filter: textFilter({
                delay: 1000,
                className: 'fw-bold',
                placeholder: 'PHONE',
            }),
        },
        {
            dataField: '_id',
            text: 'DETAILS',
            formatter: detailsFormatter,
        },
    ]

    const defaultSorted = [{
        dataField: 'userRollNumber',
        order: 'asc'
    }]

    return (
        <>
            <Row>
            <Col className='d-flex align-items-center'>
                    <h1>Applicants</h1>
                </Col>
                <Col className='d-flex align-items-center text-end justify-content-end'>
                    {applicants && <Button onClick={exportHandler}>
                        DOWNLOAD <i class="fa fa-download"></i>
                    </Button>}
                </Col>
            </Row>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
                <BootstrapTable 
                    bootstrap4
                    keyField='_id' 
                    data={applicants} 
                    columns={columns} 
                    striped
                    condensed
                    pagination={paginationFactory()}
                    filter={filterFactory()}
                    defaultSorted={defaultSorted}
                />
            )}
        </>
    )
}

export default ApplicantScreen
