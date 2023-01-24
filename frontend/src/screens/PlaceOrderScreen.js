import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

const PlaceOrderScreen = ({match, history}) => {
    const productId = match.params.id
    const dispatch = useDispatch()
    
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        if(success){
            dispatch({type: ORDER_CREATE_RESET})
            history.push(`/order/${order._id}`)
        }
    }, [history, success, order, userInfo])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            product: productId
        }))
    }

    return (
        <>
            {error && <Message>{error}</Message>}
            <Button 
                type='button'
                className='col-12'
                onClick={placeOrderHandler}>
                    CONTINUE
            </Button>
        </>
    )
}

export default PlaceOrderScreen
