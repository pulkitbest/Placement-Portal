import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button} from 'react-bootstrap'
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

  return (
      <>
          <h1>Recruiters</h1>
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
