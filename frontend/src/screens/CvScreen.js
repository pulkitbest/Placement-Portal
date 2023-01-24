import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Nav, Form, Button, Row, Col, Table, Card} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const ProfileScreen = ({match, history}) => {
    const userId  = match.params.id
    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    console.log(user)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || !user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }
        }

    }, [dispatch, history, userInfo, user, userId])

    return (
        <>
        </>
    )
}

export default ProfileScreen
