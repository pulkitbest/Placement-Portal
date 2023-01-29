import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Nav, Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listMyOrders} from '../actions/orderActions'

const UserApplicationScreen = ({location, history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const orderListMy = useSelector((state) => state.orderListMy)
    const {loading:loadingOrders, error:errorOrders, orders} = orderListMy

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            dispatch(listMyOrders())
        }

    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>My Applications</h1>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
            (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>CODING ROUNDS</th>
                            <th>INTERVIEWS</th>
                            <th>DETAILS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                } 
                            </td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : 
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                }
                            </td>
                            <td>
                                <Nav.Link as={Link} to={`/order/${order._id}`}>
                                    <Button variant='dark'>DETAILS</Button>
                                </Nav.Link>
                            </td>
                        </tr>
                        ))} 
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserApplicationScreen
