import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {getUserDetails, updateUser} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match, history}) => {
    const userId  = match.params.id
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate

    useEffect(() => {
        if(successUpdate){
            // console.log('hello')
            dispatch({type: USER_UPDATE_RESET})
            history.push('/admin/userlist')
        } else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            } else {
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, dispatch, history, userId, successUpdate])

    const submitHandler = (e) => {
        dispatch(updateUser({
            _id: userId,
            isAdmin
        }))
    }

    return (
        <>
            <FormContainer>
                <h1>Make User Admin</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <p className='fw-bold fs-3' display='inline-block'>{user.name}, {user.rollNumber}</p>
                        <p className='fw-bold' display='inline-block'>Email: <a href={`mailto:${user.email}`}>{user.email}</a></p>
                        <p className='fw-bold' display='inline-block'>College Email: <a href={`mailto:${user.collegeEmail}`}>{user.collegeEmail}</a></p>
                        <p className='fw-bold' display='inline-block'>Mobile Number: {user.phone}</p>
                        <p className='fw-bold' display='inline-block'>Programme: {user.programme}</p>
                        <p className='fw-bold' display='inline-block'>Department: {user.department}</p>
                        <p className='fw-bold' display='inline-block'>Resume: <Link to={`/cv/${user._id}`}><i class='fa-solid fa-link'></i></Link></p>
                        
                        <Form.Group controlId='isadmin'>
                            <Form.Check 
                                type='checkbox' 
                                label='Is Admin' 
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>
                        <h2> </h2>
                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
