import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button,} from "react-bootstrap";
import AdmNav from './AdmNav';

const Category = () => {
  return (
    <div>
        <AdmNav/>
        <Container className='mt-5'>
        <h1>Manage Category</h1>
        <Button variant="primary">Add Category</Button>{' '}
            <Card style={{ width: '18rem' }} className="mt-3">
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Card.Link href="#">Edit</Card.Link>
                        <Card.Link href="#">Delete</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

export default Category