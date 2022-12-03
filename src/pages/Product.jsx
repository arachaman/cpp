import React from 'react'
import Navigation from './Navigation'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Product = () => {
  return (
    <div>
        <Navigation/>
        <Container className='mt-5' md={{span: 6, offset: 2}}>
            <Row>
                <Col md={{span: 2, offset:2}} className="me-4">
                    <img src="https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="product" />
                </Col>
                <Col md={{span: 5}} >
                    <h2>Book Title</h2>
                    <h5>Stock: </h5>
                    <h3>Rp. </h3>
                    <h5>Description:</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio magnam debitis tempore quibusdam quo possimus labore! Repellat, molestiae commodi veritatis fuga laudantium laborum voluptatibus neque, corporis, veniam aliquid natus quaerat.</p>
                    <br/>
                    <Button variant="warning" className='me-2'>
                        Add to Cart
                    </Button>
                    <Button variant="danger">
                        Buy Now
                    </Button>
                </Col>
            </Row>
        </Container>

    </div>
  )
}

export default Product