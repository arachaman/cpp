import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AdmNav from './AdmNav';
import { Container, Button, Form, Row, Col } from "react-bootstrap";


const AddProd = () => {
  return (
    <div>
        <AdmNav/>

        <Container>
            <Row className='mt-5'>
                <Col md={{span: 6, offset: 3}}>
                    <h2 className='text-center'>Add Product</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Product Name </Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name" />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="productPrice">
                                    <Form.Label>Price</Form.Label>          
                                        <Form.Control type="number" placeholder="Enter Price" />
                                </Form.Group> 
                                </Col>
                            
                                <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Select>
                                    <option>Available</option>
                                    <option>Not Available</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="productImage">
                            <Form.Label>Product image link </Form.Label>
                            <Form.Control type="text" placeholder="Enter Product Name" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default AddProd