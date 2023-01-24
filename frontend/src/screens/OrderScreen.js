import React, { useEffect } from 'react'
import {Button, Row, Col, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({match, history, location}) => {
    const orderId = match.params.id

    const dispatch = useDispatch()
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading, error} = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const {loading: loadingDeliver, success: successDeliver} = orderDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        if(!order || successPay || successDeliver){
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId, order, successPay, successDeliver, history, userInfo]) 

    const successPaymentHandler = () => {
        dispatch(payOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <>
        {loading ? 
        <Loader /> : 
        error ? 
        <Message variant='danger'>{error}</Message> : 
        <>
            <Row>
                <Col md={8}>
                    <h2>Application</h2>
                        <p>
                            <strong>Name: </strong> 
                            {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        {/* <p>
                            <strong>Company: </strong>
                            {order.product.name}
                        </p> */}
                        <h2> </h2>
                        <p>Coding Rounds:</p>
                        {order.isPaid ? <Message variant='success'>Cleared on {order.paidAt.substring(0, 10)}</Message>:
                        <Message variant='danger'>Not Cleared</Message>}
                        <p>Interviews:</p>
                        {order.isDelivered ? <Message variant='success'>Cleared on {order.deliveredAt.substring(0, 10)}</Message>:
                        <Message variant='danger'>Not Cleared</Message>}
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Button variant='outline-dark' className='col-12' onClick={refreshPage}>
                                <i className='fa fa-refresh'></i> Press to refresh the status 
                            </Button>
                        </ListGroup.Item>
                        {loadingPay && <Loader/>}
                        {userInfo && userInfo.isAdmin && !order.isPaid && (
                            <ListGroup.Item>
                            <Button 
                            type='button'
                            className='col-12'
                            variant='outline-success'
                            disabled = {order.isPaid}
                            onClick={successPaymentHandler}>
                                <i className='fa fa-check'></i> Coding Rounds 
                            </Button>
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button type='button' className='col-12' variant='outline-success' onClick={deliverHandler}>
                                    <i className='fa fa-check'></i> Interviews
                                </Button>
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </>}
        </>
    )
}

export default OrderScreen
