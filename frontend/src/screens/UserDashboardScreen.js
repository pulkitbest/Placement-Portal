import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import JobOpening from '../components/JobOpening';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listJobOpenings } from '../actions/jobOpeningActions';
import FeedSearchBox from '../components/FeedSearchBox';

const UserDashboardScreen = ({history, match}) => {
    const keyword = match.params.keyword

    const dispatch = useDispatch()

    const jobOpeningList = useSelector((state) => state.jobOpeningList)//works as usestate
    const { loading, error, jobOpenings } = jobOpeningList

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
          dispatch(listJobOpenings(keyword)) //this fills our state
        }
      }, [dispatch, keyword, userInfo, history])

    return (
        <>
            <h1>Feed</h1>
            <Route render={({ history }) => <FeedSearchBox history={history} />} />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message>{error}</Message>
            ) : (
                <Row>
                {sortedJobOpenings.filter((jobOpening) => (jobOpening.verifiedByAdmin === true || userInfo.isAdmin === true)).map((jobOpening) => (
                    <Col key={jobOpening._id} sm={12} md={6} lg={4}>
                    <JobOpening jobOpening={jobOpening} />
                    </Col>
                ))}
                </Row>
            )}
        </>
    )
}

export default UserDashboardScreen
