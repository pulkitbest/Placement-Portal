import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails} from '../actions/userActions'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const ProfileScreen = ({match, history}) => {
    const userId  = match.params.id
    const dispatch = useDispatch()
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) => [],
    })

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        } else {
            if(!user || user._id !== userId){
                dispatch(getUserDetails(userId))
            }
        }

    }, [dispatch, history, userInfo, user, userId])

    return (
        <>
            {error && <Message>{error}</Message>}
            <div className="viewer">
            {user.resume&&(
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                <Viewer fileUrl={user.resume} plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
            )}
            </div>
        </>
    )
}

export default ProfileScreen
