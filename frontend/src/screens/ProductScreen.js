import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Image, ListGroup, Button, Form} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message' 
import { listProductDetails, createProductReview } from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants' 

const ProductScreen = ({history, match}) => {
    // const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    console.log(product.image)

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {success:successProductReview, error:errorProductReview} = productReviewCreate
    
    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
        if(successProductReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match, successProductReview, history, userInfo])

    const registerHandler = () => {
        history.push(`/placeorder/${match.params.id}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
    <>
        <Link className='btn btn-light my-3' to='/'>Go Back</Link>
        {
            loading ?
            <Loader/> :
            error ?
            <Message>{error}</Message> :
            (   
                <>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={6}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Role: {product.role}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            CTC: {product.ctc} LPA
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Form Deadline: {product.deadline} 
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                                onClick={registerHandler}
                                className='col-12' 
                                type='button'
                            >
                                Register
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <h2> </h2>
            <Row>
                <Col md={6}>
                    <h2>Q&A</h2>
                    {product.reviews.length === 0 && <Message>No Queries</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <p>{review.comment}</p>
                                <p>{review.createdAt.substring(0, 10)}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Query</h2>
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='commment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>   
                                        </Form.Control>
                                    </Form.Group>
                                    <p> </p>
                                    <Button type='submit' variant='primary'>
                                        Submit
                                    </Button>
                                </Form>
                            ) : <Message>Please <Link to='/login'>sign in</Link> to write a review.</Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            </>
            )
        }
    </>
    )
}

export default ProductScreen
