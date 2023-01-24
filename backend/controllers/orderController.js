import asyncHandler from 'express-async-handler'
import { Error } from 'mongoose'
import Order from '../models/orderModel.js'

//@desc Create new order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {product, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body

    if(!product){
        res.status(400)
        throw new Error('Nothing Selected to Register')
        return
    } 
    else{
        const order = new Order({
            product,
            user: req.user._id, 
        })
    
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desc Get order by id
//@route GET /api/order/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Update order to paid
//@route PUT /api/order/:id/pay
//@access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    console.log()
    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Update order to delivered
//@route PUT /api/order/:id/delivered
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    console.log()
    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
})

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
}