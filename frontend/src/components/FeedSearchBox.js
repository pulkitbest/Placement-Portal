import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const FeedSearchBox = ({history}) => {
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/student/search/${keyword}`)
        } else{
            history.push('/student')
        }
    }

    return(
        <Form onSubmit={submitHandler} className='input-group'>
        <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Job Openings...'
            className='mr-sm-2 ml-sm-5'
        ></Form.Control>
        <Button type='submit' className='btn btn-primary'>
            <i class="fas fa-search"></i>
        </Button>
        </Form>
    )
}

export default FeedSearchBox
