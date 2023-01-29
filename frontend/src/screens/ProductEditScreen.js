import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {listProductDetails, updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({match, history}) => {
    const productId  = match.params.id

    const [name, setName] = useState('')
    const [ctc, setCTC] = useState(0)
    const [image, setImage] = useState('')
    const [role, setRole] = useState('')
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState(Date.now())
    const [location, setLocation] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } 
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setImage(product.image)
                setCTC(product.ctc)
                setRole(product.role)
                setDescription(product.description)
                setDeadline(product.deadline)
                setLocation(product.location)
            }
        
    }, [product, dispatch, history, productId, successUpdate])

    const uploadFileHandler = async(e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            ctc,
            image,
            role,
            description,
            deadline,
            location,
        }))
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Details</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type='name' 
                                placeholder='Enter Name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>
                        
                        <Form.Group controlId='ctc'>
                            <Form.Label>CTC in LPA</Form.Label>
                            <Form.Control 
                                type='number' 
                                placeholder='Enter CTC' 
                                value={ctc} 
                                onChange={(e) => setCTC(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='image'>
                            <Form.Label>Enter Image URL OR Upload an Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image URL'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.Control 
                                type='file'
                                id='image-file' 
                                label='Choose File' 
                                custom 
                                onChange={uploadFileHandler}>
                            </Form.Control>
                            {uploading && <Loader/>}
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='role'>
                            <Form.Label>Role</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Role' 
                                value={role} 
                                onChange={(e) => setRole(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='location'>
                            <Form.Label>Location</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Location' 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='deadline'>
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control 
                                type='datetime-local' 
                                placeholder='Enter Deadline' 
                                value={deadline} 
                                onChange={(e) => setDeadline(e.target.value)}
                                >
                            </Form.Control>
                        </Form.Group>
                        <h4> </h4>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Description' 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
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

export default ProductEditScreen
