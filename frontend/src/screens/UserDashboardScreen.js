import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import JobOpening from '../components/JobOpening';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listJobOpenings } from '../actions/jobOpeningActions';
import FeedSearchBox from '../components/FeedSearchBox';
import Paginate from '../components/Paginate';

const UserDashboardScreen = ({history, match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const jobOpeningList = useSelector((state) => state.jobOpeningList)//works as usestate
    const { loading, error, jobOpenings, page, pages } = jobOpeningList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    var sortedJobOpenings = jobOpenings
    sortedJobOpenings.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : b.createdAt < a.createdAt ? -1 : 0
    )

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(listJobOpenings(keyword, pageNumber)) //this fills our state
        }
    }, [dispatch, keyword, pageNumber, userInfo, history])

    if(userInfo && !userInfo.isAdmin){
        if(userInfo.lookingFor === 'Summer Internship')
            sortedJobOpenings = sortedJobOpenings.filter((jobOpening) => (jobOpening.typeOfJobOpening === 'Summer Internship'))
        else
            sortedJobOpenings = sortedJobOpenings.filter((jobOpening) => (jobOpening.typeOfJobOpening !== 'Summer Internship'))
    }

    return (
        <>
            <h1>Feed</h1>
            <Route render={({ history }) => <FeedSearchBox history={history} />} />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <>
                <Row>
                {
                    sortedJobOpenings.filter((jobOpening) => (jobOpening.verifiedByAdmin === true || (userInfo && userInfo.isAdmin === true))).map((jobOpening) => (
                        <Col key={jobOpening._id} sm={12} md={6} lg={4}>
                        <JobOpening jobOpening={jobOpening} />
                        </Col>
                    ))
                }
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            )}
        </>
    )
}

export default UserDashboardScreen
