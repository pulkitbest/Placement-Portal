import React from 'react'
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const JobOpening = ({ jobOpening }) => {
  return (
    <Link to={`/jobOpening/${jobOpening._id}`} style={{ textDecoration: 'none' }}>
    <Card className='my-3 p-3 rounded'> 
        <Card.Img src={jobOpening.image} variants='top'/>
      <Card.Body>
        <Card.Title as='h4'>
            <strong>{jobOpening.nameOftheCompany}</strong>
        </Card.Title>
      <Card.Text>{jobOpening.typeOfJobOpening}</Card.Text>
      </Card.Body>
    </Card>
    </Link>
  )
}

export default JobOpening
